"""
openapi_generator.py — Reverse OpenAPI/Swagger 3.0.0 Specification Generator
Analisa tráfego HTTP interceptado e infere schemas de rotas, parâmetros e payloads.
"""
import re
import json
from typing import Dict, Any, List
from urllib.parse import urlparse, parse_qs


class OpenAPIGenerator:
    """
    Construtor reverso de OpenAPI 3.0.0 a partir de requisições reais capturadas via CDP.
    """

    @staticmethod
    def infer_schema(data: Any) -> Dict[str, Any]:
        if data is None:
            return {"type": "string", "nullable": True}
        if isinstance(data, bool):
            return {"type": "boolean"}
        if isinstance(data, int):
            return {"type": "integer"}
        if isinstance(data, float):
            return {"type": "number"}
        if isinstance(data, str):
            return {"type": "string"}
        if isinstance(data, list):
            item_schema = OpenAPIGenerator.infer_schema(data[0]) if data else {"type": "string"}
            return {"type": "array", "items": item_schema}
        if isinstance(data, dict):
            properties = {}
            for k, v in data.items():
                properties[k] = OpenAPIGenerator.infer_schema(v)
            return {"type": "object", "properties": properties}
        return {"type": "string"}

    @classmethod
    def generate_spec(cls, requests: List[Dict[str, Any]], title: str = "Reoli CDP Reverse-Engineered API") -> Dict[str, Any]:
        paths: Dict[str, Any] = {}

        for req in requests:
            url = req.get("url", "")
            method = req.get("method", "GET").lower()
            headers = req.get("headers", {})
            post_data = req.get("post_data")

            parsed = urlparse(url)
            path_template = parsed.path or "/"

            # Normaliza IDs numéricos ou UUIDs para path parameters {id}
            path_clean = re.sub(r'/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', '/{id}', path_template, flags=re.IGNORECASE)
            path_clean = re.sub(r'/[0-9]{2,10}', '/{id}', path_clean)

            if path_clean not in paths:
                paths[path_clean] = {}

            operation = {
                "summary": f"{method.upper()} {path_clean}",
                "description": f"Endpoint interceptado automaticamente via CDP. Host original: {parsed.netloc}",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Sucesso (Payload capturado)",
                        "content": {
                            "application/json": {
                                "schema": {"type": "object"}
                            }
                        }
                    }
                }
            }

            # Query Parameters
            query_params = parse_qs(parsed.query)
            for param_name, values in query_params.items():
                operation["parameters"].append({
                    "name": param_name,
                    "in": "query",
                    "required": False,
                    "schema": {"type": "string", "example": values[0] if values else ""}
                })

            # Path Parameters
            if "{id}" in path_clean:
                operation["parameters"].append({
                    "name": "id",
                    "in": "path",
                    "required": True,
                    "schema": {"type": "string"}
                })

            # Request Body
            if post_data and method in ["post", "put", "patch"]:
                try:
                    body_json = json.loads(post_data)
                    schema = cls.infer_schema(body_json)
                    operation["requestBody"] = {
                        "description": "Payload JSON inferido",
                        "required": True,
                        "content": {
                            "application/json": {
                                "schema": schema,
                                "example": body_json
                            }
                        }
                    }
                except Exception:
                    operation["requestBody"] = {
                        "description": "Raw Payload",
                        "content": {
                            "text/plain": {
                                "schema": {"type": "string"}
                            }
                        }
                    }

            paths[path_clean][method] = operation

        return {
            "openapi": "3.0.0",
            "info": {
                "title": title,
                "version": "1.0.0",
                "description": "Especificação OpenAPI gerada automaticamente por engenharia reversa via Reoli CDP AI Bridge."
            },
            "paths": paths
        }

    @staticmethod
    def get_swagger_html(openapi_json_url: str = "/api/routes/openapi.json") -> str:
        return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Reoli CDP — Live Swagger UI</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css">
    <style>
        body {{ margin: 0; background: #0f172a; }}
        .swagger-ui {{ filter: invert(88%) hue-rotate(180deg); }}
        .swagger-ui .topbar {{ display: none; }}
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
    <script>
        window.onload = () => {{
            SwaggerUIBundle({{
                url: '{openapi_json_url}',
                dom_id: '#swagger-ui',
                presets: [SwaggerUIBundle.presets.apis],
                layout: "BaseLayout"
            }});
        }};
    </script>
</body>
</html>"""
