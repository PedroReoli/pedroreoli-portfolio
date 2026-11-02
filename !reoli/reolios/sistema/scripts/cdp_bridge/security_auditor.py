"""
security_auditor.py — Módulo Avançado de Auditoria de Segurança, Vulnerabilidades e Hardening
Cobre OWASP Top 10, OWASP API Security Top 10, Supabase RLS, Database Hardening e Vazamento de Secrets.
"""
import re
import json
import base64
from typing import Dict, Any, List, Optional


class SecurityAuditor:
    """
    Motor de Auditoria Passiva e Ativa para Web Apps (Next.js, React, Node.js, Supabase, APIs REST/GraphQL).
    """

    CATEGORIES = {
        "AUTH": "Autenticação & Sessões",
        "ACCESS_CONTROL": "Autorização / RBAC / BOLA / IDOR",
        "SUPABASE_RLS": "Supabase / RLS & Storage Policies",
        "INJECTION": "Injeções (SQLi, Logic, Command, Prototype Pollution)",
        "INPUT_XSS": "Validação de Entrada & XSS (DOM, Reflected, Stored)",
        "DATA_EXPOSURE": "Exposição de Dados Sensíveis & Secrets",
        "STORAGE": "Armazenamento Inseguro (LocalStorage / SessionStorage)",
        "UPLOADS_STORAGE": "Uploads & Buckets de Storage",
        "API_RATE_LIMIT": "APIs, Webhooks & Rate Limiting",
        "SECURITY_HEADERS_CORS": "CORS, CSRF & Security Headers",
        "SSRF_TRAVERSAL": "SSRF, Path Traversal & Open Redirect",
        "BUSINESS_LOGIC": "Frontend vs Backend & Lógica de Negócio",
        "DATABASE_HARDENING": "Integridade, Normalização & Hardening de Banco de Dados"
    }

    SECRET_PATTERNS = [
        (r"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+", "Supabase / JWT Token", "HIGH"),
        (r"sbp_[a-zA-Z0-9]{40}", "Supabase Personal Access Token", "CRITICAL"),
        (r"sk_live_[0-9a-zA-Z]{24,}", "Stripe Live Secret Key", "CRITICAL"),
        (r"rk_live_[0-9a-zA-Z]{24,}", "Stripe Live Restricted Key", "CRITICAL"),
        (r"ghp_[0-9a-zA-Z]{36}", "GitHub Personal Access Token", "CRITICAL"),
        (r"AKIA[0-9A-Z]{16}", "AWS Access Key ID", "HIGH"),
        (r"AIza[0-9A-Za-z-_]{35}", "Google API Key", "MEDIUM"),
        (r"-----BEGIN PRIVATE KEY-----", "RSA/ECC Private Key", "CRITICAL"),
        (r"service_role", "Supabase Service Role Key Indicator", "CRITICAL"),
    ]

    @staticmethod
    def inspect_jwt(token: str) -> Dict[str, Any]:
        issues = []
        try:
            parts = token.split(".")
            if len(parts) != 3:
                return {"valid": False, "error": "Formato JWT inválido"}
            
            header_str = base64.urlsafe_b64decode(parts[0] + "==").decode("utf-8", errors="ignore")
            header = json.loads(header_str)
            
            payload_str = base64.urlsafe_b64decode(parts[1] + "==").decode("utf-8", errors="ignore")
            payload = json.loads(payload_str)

            alg = header.get("alg", "").lower()
            if alg == "none":
                issues.append("Algoritmo JWT definido como 'none' (vulnerabilidade crítica de autenticação).")
            elif alg in ["hs256", "hs384", "hs512"]:
                issues.append(f"JWT usa chave simétrica ({alg.upper()}). Verificar se o segredo tem alta entropia e não vaza no frontend.")

            if "exp" not in payload:
                issues.append("Token JWT não possui claim de expiração ('exp'). Sessão perpétua sem invalidação.")
            
            if payload.get("role") == "service_role":
                issues.append("ALERTA CRÍTICO: Token com role 'service_role' (bypass total de RLS do Supabase) trafegando no cliente!")

            return {
                "valid": True,
                "header": header,
                "payload_claims": list(payload.keys()),
                "role": payload.get("role"),
                "aud": payload.get("aud"),
                "has_exp": "exp" in payload,
                "issues": issues
            }
        except Exception as e:
            return {"valid": False, "error": str(e)}

    @staticmethod
    def audit_security_headers(headers: Dict[str, str]) -> List[Dict[str, Any]]:
        findings = []
        h_lower = {k.lower(): v for k, v in headers.items()}

        if "content-security-policy" not in h_lower:
            findings.append({
                "category": "SECURITY_HEADERS_CORS",
                "owasp": "A05:2021-Security Misconfiguration",
                "severity": "HIGH",
                "title": "Ausência de Content-Security-Policy (CSP)",
                "description": "O servidor não envia header CSP, aumentando a vulnerabilidade a XSS e injeção de scripts terceiros.",
                "remediation": "Configure o header 'Content-Security-Policy: default-src \'self\'; script-src \'self\' ...'"
            })
        else:
            csp = h_lower["content-security-policy"]
            if "'unsafe-inline'" in csp or "'unsafe-eval'" in csp:
                findings.append({
                    "category": "INPUT_XSS",
                    "owasp": "A03:2021-Injection",
                    "severity": "MEDIUM",
                    "title": "CSP Permissiva ('unsafe-inline' ou 'unsafe-eval')",
                    "description": "CSP permite execução de scripts inline ou eval(), facilitando exploração de DOM XSS.",
                    "remediation": "Utilize nonces ou hashes criptográficos em vez de 'unsafe-inline'."
                })

        if "strict-transport-security" not in h_lower:
            findings.append({
                "category": "AUTH",
                "owasp": "A02:2021-Cryptographic Failures",
                "severity": "MEDIUM",
                "title": "Ausência de HTTP Strict Transport Security (HSTS)",
                "description": "O navegador pode aceitar conexões HTTP inseguras sem forçar SSL/TLS.",
                "remediation": "Adicione 'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload'."
            })

        if "x-frame-options" not in h_lower and "frame-ancestors" not in h_lower.get("content-security-policy", ""):
            findings.append({
                "category": "SECURITY_HEADERS_CORS",
                "owasp": "A04:2021-Insecure Design",
                "severity": "MEDIUM",
                "title": "Vulnerabilidade Potencial a Clickjacking (Sem X-Frame-Options)",
                "description": "A página pode ser renderizada dentro de um <iframe> malicioso em outro domínio.",
                "remediation": "Configure 'X-Frame-Options: DENY' ou 'SAMEORIGIN', ou use a diretiva 'frame-ancestors \'self\'' no CSP."
            })

        if h_lower.get("x-content-type-options") != "nosniff":
            findings.append({
                "category": "SECURITY_HEADERS_CORS",
                "owasp": "A05:2021-Security Misconfiguration",
                "severity": "LOW",
                "title": "Ausência de X-Content-Type-Options: nosniff",
                "description": "Permite MIME-sniffing pelo navegador, podendo executar scripts mascarados como imagens.",
                "remediation": "Adicione 'X-Content-Type-Options: nosniff'."
            })

        cors_origin = h_lower.get("access-control-allow-origin")
        if cors_origin == "*":
            findings.append({
                "category": "SECURITY_HEADERS_CORS",
                "owasp": "A01:2021-Broken Access Control",
                "severity": "HIGH",
                "title": "CORS Wildcard Excessivamente Permissivo (Access-Control-Allow-Origin: *)",
                "description": "Qualquer site externo pode realizar requisições e ler respostas dessa API via JavaScript.",
                "remediation": "Restrinja o CORS aos domínios estritos da sua aplicação."
            })

        return findings

    @classmethod
    def audit_environment_and_traffic(
        cls,
        page_url: str,
        page_title: str,
        page_headers: Dict[str, str],
        cookies: List[Dict[str, Any]],
        local_storage: Dict[str, str],
        session_storage: Dict[str, str],
        recorded_requests: List[Dict[str, Any]],
        dom_meta: Dict[str, Any]
    ) -> Dict[str, Any]:
        findings: List[Dict[str, Any]] = []

        findings.extend(cls.audit_security_headers(page_headers))

        for cookie in cookies:
            name = cookie.get("name", "")
            is_auth_cookie = any(k in name.lower() for k in ["auth", "token", "session", "jwt", "sid", "connect.sid"])
            
            if is_auth_cookie:
                if not cookie.get("httpOnly"):
                    findings.append({
                        "category": "STORAGE",
                        "owasp": "A07:2021-Identification and Authentication Failures",
                        "severity": "HIGH",
                        "title": f"Cookie de Autenticação sem flag HttpOnly ('{name}')",
                        "description": f"O cookie '{name}' pode ser lido por qualquer script JavaScript no navegador via document.cookie, vulnerável a roubo por XSS.",
                        "remediation": "Configure o cookie com a flag 'HttpOnly=true' no backend."
                    })
                if not cookie.get("secure"):
                    findings.append({
                        "category": "AUTH",
                        "owasp": "A02:2021-Cryptographic Failures",
                        "severity": "HIGH",
                        "title": f"Cookie de Sessão sem flag Secure ('{name}')",
                        "description": f"O cookie '{name}' pode ser transmitido em texto claro em conexões HTTP não encriptadas.",
                        "remediation": "Configure a flag 'Secure=true' para forçar transmissão estrita via HTTPS."
                    })
                samesite = cookie.get("sameSite", "").lower()
                if samesite not in ["strict", "lax"]:
                    findings.append({
                        "category": "SECURITY_HEADERS_CORS",
                        "owasp": "A01:2021-Broken Access Control (CSRF)",
                        "severity": "MEDIUM",
                        "title": f"Cookie sem proteção SameSite ('{name}')",
                        "description": f"O cookie '{name}' possui SameSite={samesite or 'None'}, vulnerável a ataques de Cross-Site Request Forgery (CSRF).",
                        "remediation": "Defina 'SameSite=Lax' ou 'SameSite=Strict'."
                    })

        all_storage = {**{f"localStorage.{k}": v for k, v in local_storage.items()},
                       **{f"sessionStorage.{k}": v for k, v in session_storage.items()}}
        
        for key_path, val in all_storage.items():
            if not isinstance(val, str):
                continue

            if "eyJhbGciOi" in val:
                jwt_info = cls.inspect_jwt(val)
                severity = "HIGH" if "service_role" in val else "MEDIUM"
                findings.append({
                    "category": "STORAGE",
                    "owasp": "A02:2021-Cryptographic Failures",
                    "severity": severity,
                    "title": f"Token JWT armazenado no Web Storage ('{key_path}')",
                    "description": "JWT gravado em localStorage/sessionStorage. Qualquer vulnerabilidade de XSS na aplicação permite extração total da credencial.",
                    "evidence": f"Claims identificados: {jwt_info.get('payload_claims', [])}",
                    "remediation": "Prefira armazenar tokens de autenticação em cookies HttpOnly com SameSite=Strict."
                })
                for issue in jwt_info.get("issues", []):
                    findings.append({
                        "category": "AUTH",
                        "owasp": "A07:2021-Identification and Authentication Failures",
                        "severity": "HIGH" if "service_role" in issue or "none" in issue else "MEDIUM",
                        "title": f"Problema Estrutural no JWT ('{key_path}')",
                        "description": issue,
                        "remediation": "Ajuste a emissão do token no provedor de autenticação."
                    })

            for pattern, sec_name, sec_sev in cls.SECRET_PATTERNS:
                if re.search(pattern, val):
                    findings.append({
                        "category": "DATA_EXPOSURE",
                        "owasp": "A02:2021-Cryptographic Failures",
                        "severity": sec_sev,
                        "title": f"Chave/Segredo identificado no Storage ('{key_path}')",
                        "description": f"Detectado padrão correspondente a {sec_name} no armazenamento do navegador.",
                        "remediation": "Remova chaves privadas e tokens de serviço do bundle do frontend e do Web Storage."
                    })

        for req in recorded_requests:
            url = req.get("url", "")
            method = req.get("method", "GET")
            headers = req.get("headers", {})
            post_data = req.get("post_data", "")

            traffic_text = f"{url} {json.dumps(headers)} {post_data or ''}"
            for pattern, sec_name, sec_sev in cls.SECRET_PATTERNS:
                if re.search(pattern, traffic_text):
                    findings.append({
                        "category": "DATA_EXPOSURE",
                        "owasp": "A02:2021-Cryptographic Failures",
                        "severity": sec_sev,
                        "title": f"Possível vazamento de {sec_name} em requisição ({method} {url[:60]})",
                        "description": f"Padrão de credencial sensível detectado trafegando na rota '{url[:80]}'.",
                        "remediation": "Mantenha secrets confidenciais exclusivamente em variáveis de ambiente do backend."
                    })

            if "service_role" in traffic_text:
                findings.append({
                    "category": "SUPABASE_RLS",
                    "owasp": "A01:2021-Broken Access Control",
                    "severity": "CRITICAL",
                    "title": "SUPABASE SERVICE_ROLE KEY EXPOSTA NO CLIENTE",
                    "description": "A chave 'service_role' do Supabase bypassa completamente todas as políticas de Row Level Security (RLS). Sua exposição no frontend permite leitura e escrita irrestrita em todo o banco de dados.",
                    "remediation": "Revogue a chave no dashboard do Supabase imediatamente e utilize apenas a 'anon_key' pública no frontend."
                })

            if re.search(r"/(user|account|order|invoice|profile|tenant|org)/[0-9]{1,8}(|/)", url, re.IGNORECASE):
                findings.append({
                    "category": "ACCESS_CONTROL",
                    "owasp": "A01:2021-Broken Access Control (IDOR/BOLA)",
                    "severity": "HIGH",
                    "title": f"Potencial Rota Suscetível a IDOR/BOLA: {url[:70]}",
                    "description": "A URL utiliza identificadores numéricos previsíveis diretamente no caminho. Se o backend não validar estritamente o tenant/user_id da sessão, usuários podem ler/alterar dados de terceiros.",
                    "remediation": "Substitua IDs sequenciais por UUIDs v4 e valide a propriedade do recurso (Resource-Based Authorization / RLS) no backend."
                })

            if method in ["POST", "PUT", "PATCH"] and post_data:
                for dangerous_field in ["role", "is_admin", "admin", "permissions", "plan", "credits", "balance", "tenant_id", "user_id"]:
                    if f'"{dangerous_field}"' in post_data or f"'{dangerous_field}'" in post_data:
                        findings.append({
                            "category": "BUSINESS_LOGIC",
                            "owasp": "API3:2023-Broken Object Property Level Authorization (Mass Assignment)",
                            "severity": "HIGH",
                            "title": f"Risco de Mass Assignment no payload: campo '{dangerous_field}'",
                            "description": f"O cliente enviou o campo sensível '{dangerous_field}' em uma mutação {method}. Se o backend fizer bind direto no modelo sem DTO de sanitização, o usuário pode elevar privilégios.",
                            "remediation": "Use DTOs rigorosos (Zod, class-validator) e nunca permita bind automático de campos de permissão/roles."
                        })

        forms = dom_meta.get("forms", [])
        for form in forms:
            input_type = form.get("type", "")
            if input_type == "password" and not page_url.startswith("https://"):
                findings.append({
                    "category": "AUTH",
                    "owasp": "A02:2021-Cryptographic Failures",
                    "severity": "CRITICAL",
                    "title": "Campo de Senha em Página HTTP Insegura",
                    "description": "Formulário de autenticação transmitido sem criptografia HTTPS.",
                    "remediation": "Habilite certificado SSL/TLS e redirecione todo tráfego HTTP para HTTPS."
                })

        unique_findings = []
        seen = set()
        for f in findings:
            key = f"{f.get('title')}-{f.get('severity')}"
            if key not in seen:
                seen.add(key)
                unique_findings.append(f)

        weights = {"CRITICAL": 35, "HIGH": 20, "MEDIUM": 10, "LOW": 3, "INFO": 1}
        total_penalty = sum(weights.get(f.get("severity", "LOW"), 5) for f in unique_findings)
        risk_score = min(100, total_penalty)

        return {
            "page": {
                "title": page_title,
                "url": page_url,
                "audited_at": "now"
            },
            "summary": {
                "risk_score": risk_score,
                "risk_level": "CRÍTICO" if risk_score >= 70 else ("ALTO" if risk_score >= 40 else ("MÉDIO" if risk_score >= 20 else "BAIXO")),
                "total_findings": len(unique_findings),
                "critical": sum(1 for f in unique_findings if f["severity"] == "CRITICAL"),
                "high": sum(1 for f in unique_findings if f["severity"] == "HIGH"),
                "medium": sum(1 for f in unique_findings if f["severity"] == "MEDIUM"),
                "low": sum(1 for f in unique_findings if f["severity"] == "LOW"),
            },
            "findings": unique_findings,
            "database_and_hardening_guidelines": cls.get_db_hardening_checklist(),
            "llm_security_prompt": cls.generate_llm_deep_audit_prompt(unique_findings, page_url)
        }

    @classmethod
    def get_db_hardening_checklist(cls) -> Dict[str, Any]:
        return {
            "title": "Checklist de Hardening & Integridade de Banco de Dados (PostgreSQL / Supabase / Prisma)",
            "rules": [
                {
                    "item": "Row Level Security (RLS) Ativo",
                    "rule": "Toda tabela pública DEVE ter `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` com policies explícitas para SELECT, INSERT, UPDATE e DELETE baseadas em `auth.uid()` ou `tenant_id`."
                },
                {
                    "item": "Chaves Estrangeiras (Foreign Keys) & ON DELETE",
                    "rule": "Nunca confie em deleção lógica manual sem foreign keys bem definidas. Configure `ON DELETE CASCADE` ou `ON DELETE RESTRICT` para impedir registros órfãos."
                },
                {
                    "item": "Prevenção de N+1 Queries",
                    "rule": "Evite queries dentro de loops no backend. Utilize `JOINs` relacionais, `include` do Prisma/Drizzle ou `dataloader` em GraphQL."
                },
                {
                    "item": "Índices em Colunas de Filtro e Tenant",
                    "rule": "Crie índices B-Tree compostos em `(tenant_id, created_at)` e índices em foreign keys para garantir performance em consultas filtradas."
                },
                {
                    "item": "Validação de Constraints no Banco (CHECK, NOT NULL, UNIQUE)",
                    "rule": "Não valide dados apenas no frontend/TypeScript. Adicione constraints `CHECK (price > 0)` e `UNIQUE(tenant_id, slug)` diretamente no schema SQL."
                },
                {
                    "item": "Paginação Obrigatória (Cursor-based / Keyset)",
                    "rule": "Endpoints de listagem nunca devem retornar `SELECT *` sem cláusula `LIMIT`. Use paginação por cursor (`WHERE id > :last_id LIMIT 50`) para evitar exaustão de memória."
                }
            ]
        }

    @classmethod
    def generate_llm_deep_audit_prompt(cls, findings: List[Dict[str, Any]], url: str) -> str:
        findings_bullets = "\n".join(
            [f"- [{f['severity']}] {f['title']}: {f['description']} (Remediação: {f['remediation']})" for f in findings]
        )
        return f"""
# AUDITORIA DE SEGURANÇA E VULNERABILIDADES DE CÓDIGO (OWASP TOP 10 & API SECURITY)

URL / Escopo Analisado: {url}

## Vulnerabilidades Identificadas na Inspeção Dinâmica:
{findings_bullets if findings else "Nenhuma vulnerabilidade crítica identificada na camada externa passiva."}

## Instruções para Análise Estática & Refatoração:
1. **Autenticação & Sessões**: Valide fluxo de refresh token, revogação de sessão e proteção contra brute-force / cred-stuffing.
2. **Autorização / BOLA / IDOR**: Verifique se todas as queries filtram obrigatoriamente por tenant_id e user_id da sessão logada.
3. **Supabase & RLS**: Assegure que NENHUMA rota utilize a chave service_role no frontend e que as policies de storage protejam arquivos privados.
4. **Validação & XSS**: Inspecione se os inputs passam por schemas rigorosos (Zod/Valibot) e se não há dangerouslySetInnerHTML ou eval().
5. **Database Hardening**: Garanta constraints no banco, índices nas foreign keys e paginação por cursor para evitar DoS e N+1.
""".strip()
