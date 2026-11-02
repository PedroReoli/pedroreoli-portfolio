"""
server.py — Servidor FastAPI do Reoli CDP AI Bridge
Interface Universal para Agentes de IA:
- Inspeção e Automação de DOM Semântico (com visual overlay [#1], [#2] no Chrome real)
- Interceptação de Rede com Geração de cURLs e Postman Collection v2.1.0
- Engenharia Reversa de APIs com OpenAPI 3.0.0 & Swagger UI Dinâmico
- Exportador de Testes E2E Automatizados em Playwright
- Auditoria Profunda de Segurança & Vulnerabilidades (OWASP Top 10, API Security, Supabase RLS, DB Hardening)
- Preenchimento Automatizado de Formulários (com validação do Sobre Mim.md)
"""
import os
import re
import json
import asyncio
from pathlib import Path
from typing import Dict, Any, Optional, List
from fastapi import FastAPI, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, PlainTextResponse
from pydantic import BaseModel, Field
import uvicorn
from playwright.async_api import async_playwright

from .network_interceptor import NetworkTrafficRecorder
from .dom_parser import DOMSemanticExtractor
from .security_auditor import SecurityAuditor
from .openapi_generator import OpenAPIGenerator
from .test_exporter import TestExporter
from .visual_overlay import JS_INJECT_OVERLAY, JS_REMOVE_OVERLAY

app = FastAPI(
    title="Reoli CDP AI Bridge",
    description="Bridge universal entre Agentes de IA e Chrome real (CDP 9222) com Auditoria OWASP, Swagger Reverso e DOM Semântico.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

recorder = NetworkTrafficRecorder()
playwright_instance = None
browser_cdp = None
current_page = None


async def get_cdp_page():
    """Conecta ou reutiliza a conexão CDP na porta 9222."""
    global playwright_instance, browser_cdp, current_page
    if current_page and not current_page.is_closed():
        return current_page

    try:
        if not playwright_instance:
            playwright_instance = await async_playwright().start()
        
        browser_cdp = await playwright_instance.chromium.connect_over_cdp("http://127.0.0.1:9222")
        contexts = browser_cdp.contexts
        if not contexts:
            raise HTTPException(503, "Chrome CDP ativo, mas nenhum contexto de navegação encontrado.")
        
        pages = contexts[0].pages
        if not pages:
            current_page = await contexts[0].new_page()
        else:
            current_page = pages[0]

        async def on_request(request):
            try:
                post_data = request.post_data
            except Exception:
                post_data = None
            
            recorder.record_request({
                "url": request.url,
                "method": request.method,
                "headers": request.headers,
                "post_data": post_data,
                "resource_type": request.resource_type,
            })

        current_page.on("request", on_request)
        return current_page
    except Exception as e:
        raise HTTPException(503, f"Falha ao conectar no Chrome na porta 9222: {str(e)}. Certifique-se de que o Chrome foi iniciado com --remote-debugging-port=9222.")


# ==========================================
# 1. STATUS & SISTEMA
# ==========================================

@app.get("/api/status")
async def get_status():
    """Verifica saúde do Chrome CDP e da aba ativa."""
    page = await get_cdp_page()
    return {
        "status": "connected",
        "cdp_port": 9222,
        "title": await page.title(),
        "url": page.url,
        "recorded_api_requests": len(recorder.requests)
    }


# ==========================================
# 2. DOM SEMÂNTICO & VISUAL OVERLAY
# ==========================================

@app.get("/api/dom/tree")
async def get_dom_tree(format_for_llm: bool = Query(True, description="Se true, retorna formato conciso com IDs para a IA")):
    """Retorna a árvore de acessibilidade compacta com IDs numéricos para a IA."""
    page = await get_cdp_page()
    data = await page.evaluate(DOMSemanticExtractor.JS_EXTRACT_TREE)
    
    if format_for_llm:
        formatted_text = DOMSemanticExtractor.format_tree_for_llm(data["elements"])
        return {
            "title": data["title"],
            "url": data["url"],
            "total_interactive_elements": len(data["elements"]),
            "llm_prompt_tree": formatted_text,
            "raw_elements": data["elements"]
        }
    return data


@app.get("/api/dom/forms")
async def get_forms():
    """Mapeia todos os inputs de formulários da página para preenchimento."""
    page = await get_cdp_page()
    data = await page.evaluate(DOMSemanticExtractor.JS_EXTRACT_TREE)
    return {
        "title": data["title"],
        "url": data["url"],
        "forms": data["forms"]
    }


@app.post("/api/dom/highlight")
async def inject_visual_overlay():
    """Injeta badges visuais [#1], [#2] sobre os elementos no Chrome real."""
    page = await get_cdp_page()
    res = await page.evaluate(JS_INJECT_OVERLAY)
    return {"success": True, "details": res}


@app.post("/api/dom/clear-highlight")
async def remove_visual_overlay():
    """Remove os badges visuais da tela do Chrome real."""
    page = await get_cdp_page()
    res = await page.evaluate(JS_REMOVE_OVERLAY)
    return {"success": True, "details": res}


# ==========================================
# 3. ROTAS, CURLS, POSTMAN & SWAGGER REVERSO
# ==========================================

@app.get("/api/routes/internal")
async def get_internal_routes():
    """Extrai todos os links internos e rotas SPA navegáveis."""
    page = await get_cdp_page()
    data = await page.evaluate(DOMSemanticExtractor.JS_EXTRACT_TREE)
    return {
        "current_url": data["url"],
        "internal_routes": data["internal_routes"],
        "spa_context": data["spa_context"]
    }


@app.get("/api/routes/apis")
async def get_api_traffic(limit: int = 50):
    """Lista chamadas de API interceptadas com comandos cURL prontos."""
    return {
        "total": len(recorder.requests),
        "requests": recorder.requests[:limit]
    }


@app.get("/api/routes/postman")
async def export_postman_collection(collection_name: str = "Reoli CDP Intercepted APIs"):
    """Exporta todas as APIs interceptadas no formato nativo do Postman Collection v2.1.0."""
    return recorder.to_postman_collection(collection_name)


@app.get("/api/routes/openapi.json")
async def export_openapi_spec(title: str = "Reoli CDP Reverse-Engineered API"):
    """Gera especificação OpenAPI 3.0.0 a partir de todo o tráfego HTTP capturado."""
    return OpenAPIGenerator.generate_spec(recorder.requests, title=title)


@app.get("/api/routes/swagger", response_class=HTMLResponse)
async def view_swagger_ui():
    """Renderiza interface interativa do Swagger UI com as rotas interceptadas."""
    return OpenAPIGenerator.get_swagger_html("/api/routes/openapi.json")


# ==========================================
# 4. EXPORTAÇÃO DE TESTES E2E (PLAYWRIGHT)
# ==========================================

@app.get("/api/export/playwright-test", response_class=PlainTextResponse)
async def export_playwright_test():
    """Gera script completo de teste automatizado em Playwright (Python) para a sessão."""
    page = await get_cdp_page()
    return TestExporter.generate_playwright_python(page.url, recorder.requests)


# ==========================================
# 5. AUDITORIA DE SEGURANÇA & VULNERABILIDADES
# ==========================================

@app.get("/api/security/audit")
async def run_security_audit():
    """
    Executa auditoria profunda de segurança no ambiente ativo (DOM, Cookies, Storage, Headers, APIs, Supabase e JWTs).
    """
    page = await get_cdp_page()
    
    # 1. Extrai Storage e Cookies da página
    js_storage = """
    () => {
        const local = {};
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            local[k] = localStorage.getItem(k);
        }
        const session = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const k = sessionStorage.key(i);
            session[k] = sessionStorage.getItem(k);
        }
        return { localStorage: local, sessionStorage: session };
    }
    """
    storage_data = await page.evaluate(js_storage)
    context = page.context
    cookies = await context.cookies([page.url])
    
    # 2. Extrai DOM metadata
    dom_data = await page.evaluate(DOMSemanticExtractor.JS_EXTRACT_TREE)
    
    # 3. Extrai Headers da página atual (se interceptados)
    main_headers = {}
    for r in reversed(recorder.requests):
        if r.get("url") == page.url:
            main_headers = r.get("headers", {})
            break

    # 4. Executa Auditoria Completa
    audit_report = SecurityAuditor.audit_environment_and_traffic(
        page_url=page.url,
        page_title=await page.title(),
        page_headers=main_headers,
        cookies=cookies,
        local_storage=storage_data.get("localStorage", {}),
        session_storage=storage_data.get("sessionStorage", {}),
        recorded_requests=recorder.requests,
        dom_meta=dom_data
    )

    return audit_report


@app.get("/api/security/checklist")
async def get_security_checklist():
    """Retorna o guia completo de categorias de vulnerabilidades (OWASP Top 10 + API Security)."""
    return {
        "categories": SecurityAuditor.CATEGORIES,
        "database_hardening": SecurityAuditor.get_db_hardening_checklist()
    }


# ==========================================
# 6. AÇÕES NO BROWSER & AUTOFILL
# ==========================================

class ClickRequest(BaseModel):
    id: Optional[int] = None
    selector: Optional[str] = None
    text: Optional[str] = None


class FillRequest(BaseModel):
    id: Optional[int] = None
    selector: Optional[str] = None
    value: str


class NavigateRequest(BaseModel):
    url: str


@app.post("/api/action/click")
async def execute_click(req: ClickRequest):
    """Executa um clique por ID semântico, seletor CSS ou texto visível."""
    page = await get_cdp_page()
    if req.id:
        data = await page.evaluate(DOMSemanticExtractor.JS_EXTRACT_TREE)
        target = next((el for el in data["elements"] if el["id"] == req.id), None)
        if not target:
            raise HTTPException(404, f"Elemento com ID {req.id} não encontrado.")
        b = target["bounds"]
        await page.mouse.click(b["x"] + b["width"] / 2, b["y"] + b["height"] / 2)
        return {"success": True, "clicked": target}
    elif req.selector:
        await page.click(req.selector)
        return {"success": True, "selector": req.selector}
    elif req.text:
        await page.click(f"text={req.text}")
        return {"success": True, "text": req.text}
    raise HTTPException(400, "Forneça 'id', 'selector' ou 'text'.")


@app.post("/api/action/fill")
async def execute_fill(req: FillRequest):
    """Preenche um input específico por ID ou seletor."""
    page = await get_cdp_page()
    if req.id:
        data = await page.evaluate(DOMSemanticExtractor.JS_EXTRACT_TREE)
        target = next((el for el in data["forms"] if el["id"] == req.id), None)
        if not target:
            raise HTTPException(404, f"Campo com ID {req.id} não encontrado.")
        b = target["bounds"]
        await page.mouse.click(b["x"] + b["width"] / 2, b["y"] + b["height"] / 2)
        await page.keyboard.type(req.value, delay=15)
        return {"success": True, "filled": target, "value": req.value}
    elif req.selector:
        await page.fill(req.selector, req.value)
        return {"success": True, "selector": req.selector, "value": req.value}
    raise HTTPException(400, "Forneça 'id' ou 'selector'.")


def load_profile_data() -> Dict[str, Any]:
    """Carrega dados do perfil de forma segura:
    1. .privado/perfil.json ou .privado/candidatura.json (no diretório de trabalho)
    2. .privado/perfil.json na raiz do repositório ReoliOS
    3. ~/.reoli/perfil.json (na máquina do usuário)
    4. Variáveis de ambiente REOLI_PROFILE_*
    """
    possible_paths = [
        Path.cwd() / ".privado" / "perfil.json",
        Path.cwd() / ".privado" / "candidatura.json",
        Path(__file__).resolve().parents[3] / ".privado" / "perfil.json",
        Path.home() / ".reoli" / "perfil.json",
    ]

    for p in possible_paths:
        if p.is_file():
            try:
                with open(p, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, dict) and data.get("name"):
                        return data
            except Exception as err:
                print(f"[CDP Bridge] Falha ao ler {p}: {err}")

    # Fallback para variáveis de ambiente ou vazio
    return {
        "name": os.getenv("REOLI_PROFILE_NAME", ""),
        "first_name": os.getenv("REOLI_PROFILE_FIRST_NAME", ""),
        "email": os.getenv("REOLI_PROFILE_EMAIL", ""),
        "phone": os.getenv("REOLI_PROFILE_PHONE", ""),
        "phone_clean": os.getenv("REOLI_PROFILE_PHONE_CLEAN", ""),
        "linkedin": os.getenv("REOLI_PROFILE_LINKEDIN", ""),
        "github": os.getenv("REOLI_PROFILE_GITHUB", ""),
        "portfolio": os.getenv("REOLI_PROFILE_PORTFOLIO", ""),
        "location": os.getenv("REOLI_PROFILE_LOCATION", ""),
        "role": os.getenv("REOLI_PROFILE_ROLE", ""),
        "headline": os.getenv("REOLI_PROFILE_HEADLINE", "")
    }


@app.post("/api/action/autofill")
async def execute_autofill():
    """Preenche automaticamente formulários com os dados oficiais configurados em .privado/perfil.json."""
    profile_data = load_profile_data()
    if not profile_data.get("name"):
        raise HTTPException(
            status_code=400,
            detail="Nenhum perfil configurado. Crie seu arquivo '.privado/perfil.json' ou execute 'reoli' no terminal."
        )
    page = await get_cdp_page()

    js_autofill = """
    (profile) => {
        const results = [];
        const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([disabled]), textarea:not([disabled])'));
        
        for (const input of inputs) {
            const descriptor = (input.name + ' ' + input.id + ' ' + input.placeholder + ' ' + (input.getAttribute('aria-label') || '')).toLowerCase();
            let valueToFill = null;

            if (descriptor.match(/first.?name|primeiro.?nome/)) {
                valueToFill = profile.first_name;
            } else if (descriptor.match(/full.?name|nome.?completo|name|nome/)) {
                valueToFill = profile.name;
            } else if (descriptor.match(/e.?mail|email/)) {
                valueToFill = profile.email;
            } else if (descriptor.match(/phone|tel|celular|whatsapp|telefone/)) {
                valueToFill = profile.phone;
            } else if (descriptor.match(/linkedin/)) {
                valueToFill = profile.linkedin;
            } else if (descriptor.match(/github/)) {
                valueToFill = profile.github;
            } else if (descriptor.match(/portfolio|site|website/)) {
                valueToFill = profile.portfolio;
            } else if (descriptor.match(/cidade|city|location|localiza/)) {
                valueToFill = profile.location;
            } else if (descriptor.match(/cargo|title|headline|role/)) {
                valueToFill = profile.role;
            }

            if (valueToFill) {
                input.focus();
                input.value = valueToFill;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                results.push({ field: descriptor.substring(0, 40), filled: valueToFill });
            }
        }
        return results;
    }
    """
    
    filled = await page.evaluate(js_autofill, profile_data)
    return {
        "success": True,
        "total_filled": len(filled),
        "fields": filled
    }


@app.post("/api/action/navigate")
async def execute_navigate(req: NavigateRequest):
    """Navega para nova URL."""
    page = await get_cdp_page()
    await page.goto(req.url, wait_until="domcontentloaded")
    return {"success": True, "url": page.url, "title": await page.title()}


# ==========================================
# 7. TOOL CALLING ESPECIFICAÇÃO
# ==========================================

@app.get("/api/tools.json")
async def get_llm_tools_spec():
    """Retorna contratos de Tool Calling para OpenAI, Claude e Gemini."""
    return {
        "tools": [
            {
                "name": "get_dom_tree",
                "description": "Obtém a árvore semântica compacta com IDs numéricos para decidir ações no browser.",
                "parameters": {"type": "object", "properties": {}}
            },
            {
                "name": "run_security_audit",
                "description": "Executa auditoria completa de vulnerabilidades (OWASP Top 10, API Security, Supabase RLS, Storage leaks).",
                "parameters": {"type": "object", "properties": {}}
            },
            {
                "name": "highlight_elements",
                "description": "Injeta badges com IDs visuais [#1], [#2] na interface do Chrome real para inspeção visual.",
                "parameters": {"type": "object", "properties": {}}
            },
            {
                "name": "get_api_curls",
                "description": "Lista chamadas de API feitas pela página com comandos cURL reproduzíveis.",
                "parameters": {"type": "object", "properties": {}}
            },
            {
                "name": "click_element",
                "description": "Executa clique em um elemento da página por ID numérico ou texto.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "description": "ID numérico retornado pelo get_dom_tree"},
                        "text": {"type": "string", "description": "Texto visível do botão/link"}
                    }
                }
            },
            {
                "name": "autofill_form",
                "description": "Preenche automaticamente todos os campos de formulário na tela com dados oficiais.",
                "parameters": {"type": "object", "properties": {}}
            }
        ]
    }


def main():
    print("=======================================================")
    print("   REOLI CDP AI BRIDGE v2.0 — AGENTIC BROWSER API     ")
    print("=======================================================")
    print(" Conectando ao Chrome na porta 9222...")
    print(" API pronta em:       http://127.0.0.1:8765")
    print(" Swagger Interativo:  http://127.0.0.1:8765/docs")
    print(" Reverse Swagger UI:  http://127.0.0.1:8765/api/routes/swagger")
    print(" Auditoria OWASP:     http://127.0.0.1:8765/api/security/audit")
    print("=======================================================")
    uvicorn.run(app, host="127.0.0.1", port=8765, log_level="info")


if __name__ == "__main__":
    main()
