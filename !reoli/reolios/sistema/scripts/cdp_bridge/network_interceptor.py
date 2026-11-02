"""
network_interceptor.py — Captura chamadas de API (XHR/Fetch) via CDP e gera cURLs/Postman Collections
"""
import shlex
from typing import Dict, Any, List
from datetime import datetime


class NetworkTrafficRecorder:
    def __init__(self):
        self.requests: List[Dict[str, Any]] = []
        self.max_history = 150

    def record_request(self, request_data: Dict[str, Any]):
        url = request_data.get("url", "")
        # Ignora arquivos estáticos pesados (imagens, fontes, css, chunks) para focar em APIs reais
        if any(url.lower().endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".gif", ".svg", ".woff", ".woff2", ".ttf", ".css", ".ico"]):
            return
        
        # Filtra chamadas de API, GraphQL, XHR, Fetch ou JSON
        entry = {
            "id": len(self.requests) + 1,
            "timestamp": datetime.now().isoformat(),
            "url": url,
            "method": request_data.get("method", "GET"),
            "headers": request_data.get("headers", {}),
            "post_data": request_data.get("post_data"),
            "resource_type": request_data.get("resource_type", "xhr"),
        }
        
        # Gera o cURL executável correspondente
        entry["curl"] = self.generate_curl(entry)
        
        self.requests.insert(0, entry)
        if len(self.requests) > self.max_history:
            self.requests.pop()

    def generate_curl(self, entry: Dict[str, Any]) -> str:
        """Converte uma requisição gravada em comando cURL reproduzível."""
        method = entry.get("method", "GET")
        url = entry.get("url", "")
        headers = entry.get("headers", {})
        post_data = entry.get("post_data")

        parts = [f"curl -X {method} {shlex.quote(url)}"]

        for key, value in headers.items():
            # Ignora pseudo-headers do HTTP/2 ou headers problemáticos
            if key.startswith(":") or key.lower() in ("content-length", "host"):
                continue
            parts.append(f"-H {shlex.quote(f'{key}: {value}')}")

        if post_data:
            parts.append(f"--data-raw {shlex.quote(str(post_data))}")

        return " \\\n  ".join(parts)

    def to_postman_collection(self, collection_name: str = "Reoli CDP Export") -> Dict[str, Any]:
        """Converte todas as APIs interceptadas em formato nativo do Postman Collection v2.1.0."""
        items = []
        for req in self.requests:
            url_str = req["url"]
            method = req["method"]
            headers = [{"key": k, "value": v} for k, v in req.get("headers", {}).items() if not k.startswith(":")]
            
            item = {
                "name": f"[{method}] {url_str.split('?')[0].split('/')[-1] or url_str}",
                "request": {
                    "method": method,
                    "header": headers,
                    "url": {
                        "raw": url_str,
                        "protocol": url_str.split("://")[0] if "://" in url_str else "https",
                        "host": url_str.split("://")[1].split("/")[0].split(":") if "://" in url_str else [],
                        "path": [p for p in url_str.split("?")[0].split("/")[3:] if p] if "://" in url_str else []
                    }
                },
                "response": []
            }
            
            if req.get("post_data"):
                item["request"]["body"] = {
                    "mode": "raw",
                    "raw": req["post_data"],
                    "options": {
                        "raw": {
                            "language": "json"
                        }
                    }
                }
            
            items.append(item)

        return {
            "info": {
                "_postman_id": f"reoli-cdp-{int(datetime.now().timestamp())}",
                "name": collection_name,
                "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
            },
            "item": items
        }

    def clear(self):
        self.requests.clear()
