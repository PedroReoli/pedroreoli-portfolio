"""
test_exporter.py — Exportador de Testes E2E Automatizados em Playwright (Python & TypeScript)
"""
from typing import List, Dict, Any


class TestExporter:
    """
    Gera scripts determinísticos de teste E2E prontos para CI/CD a partir do tráfego e ações.
    """

    @staticmethod
    def generate_playwright_python(url: str, requests: List[Dict[str, Any]]) -> str:
        code_lines = [
            "# test_generated_e2e.py — Gerado automaticamente pelo Reoli CDP AI Bridge",
            "import pytest",
            "from playwright.async_api import async_playwright",
            "",
            "",
            "@pytest.mark.asyncio",
            "async def test_application_flow():",
            "    async with async_playwright() as p:",
            "        browser = await p.chromium.launch(headless=True)",
            "        context = await browser.new_context()",
            "        page = await context.new_page()",
            "",
            f"        # 1. Navegação Inicial",
            f"        await page.goto({repr(url)}, wait_until='networkidle')",
            "        assert page.url != '', 'A página deve carregar com sucesso'",
            "",
            "        # 2. Asserções de APIs Interceptadas"
        ]

        if not requests:
            code_lines.append("        pass")
        else:
            for req in requests[:15]:
                method = req.get("method", "GET").upper()
                req_url = req.get("url", "")
                post_data = req.get("post_data")

                if method == "GET":
                    code_lines.append(f"        response = await page.request.get({repr(req_url)})")
                    code_lines.append(f"        assert response.status < 400, f'GET falhou com status {{response.status}}'")
                elif method in ["POST", "PUT", "PATCH"]:
                    body_arg = f", data={repr(post_data)}" if post_data else ""
                    code_lines.append(f"        response = await page.request.{method.lower()}({repr(req_url)}{body_arg})")
                    code_lines.append(f"        assert response.status < 400, f'{method} falhou com status {{response.status}}'")

        code_lines.extend([
            "",
            "        await browser.close()",
            ""
        ])
        return "\n".join(code_lines)
