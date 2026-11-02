"""
render_carousel.py — Motor Morfologico de Geracao de Carrosseis HTML & Exportacao (ReoliOS)

Aceita um schema JSON declarativo de slides e compila em um visualizador HTML
standalone de alta fidelidade (Vercel/Linear Dark Theme) com suporte a exportacao
PNG/PDF via Playwright ou Browser Print.
"""

import json
import os
import re
import sys
import argparse
from typing import Dict, Any, List


def parse_markdown_formatting(text: str) -> str:
    """Converte markdown basico (**bold**, *italic*, `code`) em tags HTML com destaque."""
    if not text:
        return ""
    # **destaque ciano**
    text = re.sub(r"\*\*(.+?)\*\*", r"<span class='text-cyan'>\1</span>", text)
    # *italico*
    text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", text)
    # `codigo`
    text = re.sub(r"`(.+?)`", r"<code class='inline-code'>\1</code>", text)
    return text


def render_block(block: Dict[str, Any]) -> str:
    """Renderiza um bloco individual do schema para HTML."""
    b_type = block.get("type", "text")

    if b_type == "text":
        variant = block.get("variant", "p")
        raw_text = parse_markdown_formatting(block.get("text", ""))
        if variant == "h1":
            return f'<h1 class="slide-title">{raw_text}</h1>'
        elif variant == "h2":
            return f'<h2 class="slide-subtitle">{raw_text}</h2>'
        elif variant == "lead":
            return f'<p class="slide-lead">{raw_text}</p>'
        else:
            return f'<p class="slide-paragraph">{raw_text}</p>'

    elif b_type == "card":
        variant = block.get("variant", "neutral")
        title = parse_markdown_formatting(block.get("title", ""))
        body = parse_markdown_formatting(block.get("body", ""))
        icon = block.get("icon", "")
        icon_html = f'<span class="card-icon">{icon}</span> ' if icon else ''
        return f'''
        <div class="feature-card {variant}">
            {f'<div class="card-title">{icon_html}{title}</div>' if title else ''}
            {f'<div class="card-body">{body}</div>' if body else ''}
        </div>
        '''

    elif b_type == "code":
        lang = block.get("language", "typescript")
        filename = block.get("filename", "")
        code = block.get("code", "")
        # Sanitize HTML in code
        code_escaped = code.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        header_html = f'<div class="code-header"><span>{filename or lang}</span></div>' if filename or lang else ''
        return f'''
        <div class="code-wrapper">
            {header_html}
            <pre class="code-block language-{lang}"><code>{code_escaped}</code></pre>
        </div>
        '''

    elif b_type == "stats":
        items = block.get("items", [])
        items_html = []
        for item in items:
            val = item.get("value", "")
            lbl = parse_markdown_formatting(item.get("label", ""))
            change = item.get("change", "")
            trend = item.get("trend", "neutral")
            change_html = f'<span class="stat-change {trend}">{change}</span>' if change else ''
            items_html.append(f'''
            <div class="stat-item">
                <div class="stat-val">{val} {change_html}</div>
                <div class="stat-lbl">{lbl}</div>
            </div>
            ''')
        return f'<div class="stats-grid">{"".join(items_html)}</div>'

    elif b_type == "badges":
        tags = block.get("items", [])
        tags_html = [f'<span class="pill-tag">{parse_markdown_formatting(t)}</span>' for t in tags]
        return f'<div class="badges-row">{"".join(tags_html)}</div>'

    elif b_type == "flow":
        steps = block.get("steps", [])
        steps_html = []
        for i, step in enumerate(steps, 1):
            title = parse_markdown_formatting(step.get("title", ""))
            desc = parse_markdown_formatting(step.get("desc", ""))
            steps_html.append(f'''
            <div class="flow-step">
                <div class="step-num">{i:02d}</div>
                <div class="step-content">
                    <div class="step-title">{title}</div>
                    {f'<div class="step-desc">{desc}</div>' if desc else ''}
                </div>
            </div>
            ''')
        return f'<div class="flow-container">{"".join(steps_html)}</div>'

    elif b_type == "columns":
        ratio = block.get("ratio", "50-50")
        cols = block.get("columns", [])
        cols_html = []
        for col in cols:
            inner_blocks = "".join(render_block(b) for b in col.get("blocks", []))
            cols_html.append(f'<div class="col-item">{inner_blocks}</div>')
        return f'<div class="columns-grid ratio-{ratio}">{"".join(cols_html)}</div>'

    return ""


def render_slide(slide: Dict[str, Any], meta: Dict[str, Any], index: int, total: int) -> str:
    """Renderiza um slide completo com header, corpo e footer padronizados."""
    kicker = parse_markdown_formatting(slide.get("kicker", meta.get("category", "ARQUITETURA & DEV")))
    layout = slide.get("layout", "content")
    author = meta.get("author", {})
    author_name = author.get("name", "Pedro Lucas Reis")
    author_role = author.get("role", "Full Stack Software Engineer")
    slide_num_str = f"{index:02d} / {total:02d}"

    blocks_html = "".join(render_block(b) for b in slide.get("blocks", []))

    return f'''
    <div class="slide slide-{layout} {'active' if index == 1 else ''}" data-slide="{index}">
        <div class="slide-header">
            <span class="tag-badge">{kicker}</span>
            <span class="slide-index">{slide_num_str}</span>
        </div>
        <div class="slide-body">
            {blocks_html}
        </div>
        <div class="slide-footer">
            <div class="author-info">
                <strong>{author_name}</strong>
                <span>· {author_role}</span>
            </div>
            <div class="slide-cta">
                {slide.get("footer_cta", "Arraste para o lado ➔" if index < total else "💬 Deixe sua opiniao")}
            </div>
        </div>
    </div>
    '''


def compile_carousel_html(data: Dict[str, Any]) -> str:
    """Gera o HTML final completo com CSS e JavaScript de navegacao/impressao."""
    meta = data.get("meta", {})
    slides = data.get("slides", [])
    total_slides = len(slides)
    title = meta.get("title", "Carrossel Tecnico")
    aspect_ratio = meta.get("aspect_ratio", "1:1")

    slides_html = "".join(render_slide(s, meta, i + 1, total_slides) for i, s in enumerate(slides))

    ratio_css = "width: 640px; height: 640px;" if aspect_ratio == "1:1" else "width: 640px; height: 800px;"
    print_ratio_css = "width: 1080px; height: 1080px;" if aspect_ratio == "1:1" else "width: 1080px; height: 1350px;"

    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-body: #030712;
            --bg-slide: #090d16;
            --card-bg: rgba(255, 255, 255, 0.03);
            --card-border: rgba(255, 255, 255, 0.08);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --cyan: #38bdf8;
            --emerald: #10b981;
            --rose: #f43f5e;
            --amber: #f59e0b;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-mono: 'Geist Mono', monospace;
        }}

        * {{ box-sizing: border-box; margin: 0; padding: 0; }}

        body {{
            background: var(--bg-body);
            color: var(--text-main);
            font-family: var(--font-sans);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 30px 20px;
        }}

        .toolbar {{
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
            background: rgba(255, 255, 255, 0.05);
            padding: 8px 18px;
            border-radius: 40px;
            border: 1px solid var(--card-border);
            backdrop-filter: blur(12px);
        }}

        .btn {{
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            color: #fff;
            padding: 6px 14px;
            border-radius: 16px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: var(--font-sans);
        }}
        .btn:hover {{
            background: var(--cyan);
            color: #000;
            border-color: var(--cyan);
        }}
        .btn.primary {{
            background: var(--cyan);
            color: #000;
            font-weight: 700;
        }}
        .counter-badge {{
            font-family: var(--font-mono);
            font-size: 13px;
            color: var(--cyan);
            font-weight: 700;
        }}

        .viewport {{
            {ratio_css}
            position: relative;
        }}

        .slide {{
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 10% 10%, rgba(56, 189, 248, 0.08) 0%, var(--bg-slide) 75%);
            border: 1px solid var(--card-border);
            border-radius: 24px;
            padding: 44px;
            display: none;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
            position: relative;
            overflow: hidden;
        }}

        .slide.active {{
            display: flex;
            animation: fadeIn 0.25s ease forwards;
        }}

        .slide::before {{
            content: "";
            position: absolute;
            inset: 0;
            background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 32px 32px;
            pointer-events: none;
        }}

        .slide-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 2;
        }}

        .tag-badge {{
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--cyan);
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.25);
            padding: 5px 12px;
            border-radius: 16px;
        }}

        .slide-index {{
            font-family: var(--font-mono);
            font-size: 12px;
            color: var(--text-muted);
            font-weight: 600;
        }}

        .slide-body {{
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin: auto 0;
        }}

        .text-cyan {{ color: var(--cyan); font-weight: inherit; }}
        .inline-code {{
            font-family: var(--font-mono);
            font-size: 0.9em;
            background: rgba(255, 255, 255, 0.06);
            padding: 2px 6px;
            border-radius: 4px;
            color: var(--cyan);
        }}

        h1.slide-title {{
            font-size: 30px;
            font-weight: 900;
            line-height: 1.22;
            letter-spacing: -0.02em;
            color: #fff;
        }}

        h2.slide-subtitle {{
            font-size: 24px;
            font-weight: 800;
            line-height: 1.25;
            letter-spacing: -0.015em;
            color: #fff;
        }}

        p.slide-lead {{
            font-size: 15px;
            line-height: 1.6;
            color: var(--text-muted);
        }}

        p.slide-paragraph {{
            font-size: 14px;
            line-height: 1.5;
            color: var(--text-muted);
        }}

        .feature-card {{
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 14px;
            padding: 14px 18px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }}

        .feature-card.danger {{
            border-left: 4px solid var(--rose);
            background: rgba(244, 63, 94, 0.05);
        }}

        .feature-card.success {{
            border-left: 4px solid var(--emerald);
            background: rgba(16, 185, 129, 0.05);
        }}

        .feature-card.accent {{
            border-left: 4px solid var(--cyan);
            background: rgba(56, 189, 248, 0.05);
        }}

        .feature-card.amber {{
            border-left: 4px solid var(--amber);
            background: rgba(245, 158, 11, 0.05);
        }}

        .card-title {{
            font-size: 13.5px;
            font-weight: 700;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 8px;
        }}

        .card-body {{
            font-size: 12.5px;
            color: var(--text-muted);
            line-height: 1.5;
        }}

        .code-wrapper {{
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 12px;
            overflow: hidden;
        }}

        .code-header {{
            background: rgba(255, 255, 255, 0.03);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding: 6px 12px;
            font-family: var(--font-mono);
            font-size: 11px;
            color: var(--text-muted);
        }}

        .code-block {{
            padding: 12px 16px;
            font-family: var(--font-mono);
            font-size: 12px;
            line-height: 1.5;
            color: #e2e8f0;
            overflow-x: auto;
        }}

        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
            gap: 12px;
        }}

        .stat-item {{
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 12px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }}

        .stat-val {{
            font-family: var(--font-mono);
            font-size: 20px;
            font-weight: 800;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 6px;
        }}

        .stat-change.positive {{ color: var(--emerald); font-size: 11px; }}
        .stat-change.negative {{ color: var(--rose); font-size: 11px; }}

        .stat-lbl {{
            font-size: 11px;
            color: var(--text-muted);
            font-weight: 500;
        }}

        .badges-row {{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }}

        .pill-tag {{
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 4px 10px;
            border-radius: 12px;
            color: #cbd5e1;
        }}

        .columns-grid {{
            display: grid;
            gap: 14px;
        }}

        .columns-grid.ratio-50-50 {{ grid-template-columns: 1fr 1fr; }}
        .columns-grid.ratio-60-40 {{ grid-template-columns: 3fr 2fr; }}
        .columns-grid.ratio-70-30 {{ grid-template-columns: 7fr 3fr; }}
        .columns-grid.ratio-40-60 {{ grid-template-columns: 2fr 3fr; }}

        .flow-container {{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }}

        .flow-step {{
            display: flex;
            align-items: flex-start;
            gap: 12px;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            padding: 10px 14px;
            border-radius: 12px;
        }}

        .step-num {{
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 800;
            color: var(--cyan);
            background: rgba(56, 189, 248, 0.12);
            padding: 4px 8px;
            border-radius: 6px;
        }}

        .step-title {{
            font-size: 13px;
            font-weight: 700;
            color: #fff;
        }}

        .step-desc {{
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 2px;
        }}

        .slide-footer {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 2;
            padding-top: 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }}

        .author-info {{
            font-size: 12.5px;
            color: #fff;
        }}
        .author-info span {{
            font-size: 11.5px;
            color: var(--text-muted);
        }}

        .slide-cta {{
            font-family: var(--font-mono);
            font-size: 11.5px;
            color: var(--cyan);
            font-weight: 600;
        }}

        @keyframes fadeIn {{
            from {{ opacity: 0; transform: scale(0.985); }}
            to {{ opacity: 1; transform: scale(1); }}
        }}

        @media print {{
            body {{
                padding: 0;
                background: #000;
            }}
            .toolbar {{ display: none; }}
            .viewport {{
                {print_ratio_css}
            }}
            .slide {{
                display: flex !important;
                page-break-after: always;
                {print_ratio_css}
                padding: 70px;
                border-radius: 0;
                border: none;
            }}
            h1.slide-title {{ font-size: 42px; }}
            h2.slide-subtitle {{ font-size: 34px; }}
            p.slide-lead {{ font-size: 20px; }}
            p.slide-paragraph {{ font-size: 18px; }}
            .feature-card {{ padding: 22px; border-radius: 18px; }}
            .card-title {{ font-size: 18px; }}
            .card-body {{ font-size: 16px; }}
            .tag-badge {{ font-size: 14px; padding: 8px 18px; }}
            .author-info {{ font-size: 16px; }}
            .author-info span {{ font-size: 14px; }}
        }}
    </style>
</head>
<body>

    <div class="toolbar">
        <button class="btn" onclick="prevSlide()">◀ Anterior</button>
        <span class="counter-badge" id="counter">01 / {total_slides:02d}</span>
        <button class="btn" onclick="nextSlide()">Próximo ▶</button>
        <button class="btn primary" onclick="window.print()">🖨️ Exportar PDF</button>
    </div>

    <div class="viewport">
        {slides_html}
    </div>

    <script>
        let current = 0;
        const slides = document.querySelectorAll('.slide');
        const counter = document.getElementById('counter');

        function update() {{
            slides.forEach((s, i) => s.classList.toggle('active', i === current));
            counter.textContent = `${{String(current + 1).padStart(2, '0')}} / ${{String(slides.length).padStart(2, '0')}}`;
        }}

        function nextSlide() {{
            if (current < slides.length - 1) {{ current++; update(); }}
        }}

        function prevSlide() {{
            if (current > 0) {{ current--; update(); }}
        }}

        document.addEventListener('keydown', (e) => {{
            if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        }});
    </script>
</body>
</html>
'''


def main():
    parser = argparse.ArgumentParser(description="Renderizador Morfologico de Carrosseis HTML (ReoliOS)")
    parser.add_argument("input", help="Caminho do arquivo JSON do carrossel (ex: carousel.json)")
    parser.add_argument("-o", "--output", help="Caminho do arquivo HTML de saida", default=None)
    parser.add_argument("--export-png", action="store_true", help="Exporta cada slide como PNG via Playwright")
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"[ERRO] Arquivo de entrada nao encontrado: {args.input}")
        sys.exit(1)

    with open(args.input, "r", encoding="utf-8-sig") as f:
        data = json.load(f)

    html_content = compile_carousel_html(data)

    out_path = args.output
    if not out_path:
        base, _ = os.path.splitext(args.input)
        out_path = f"{base}.html"

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"[SUCESSO] Carrossel compilado em: {out_path}")

    if args.export_png:
        try:
            from playwright.sync_api import sync_playwright
            print("[INFO] Exportando slides para PNG via Playwright...")
            out_dir = os.path.dirname(os.path.abspath(out_path))
            png_dir = os.path.join(out_dir, "png_export")
            os.makedirs(png_dir, exist_ok=True)

            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                page = browser.new_page(viewport={"width": 1080, "height": 1080})
                page.goto(f"file:///{os.path.abspath(out_path).replace(chr(92), '/')}")
                slides_count = len(data.get("slides", []))

                for i in range(slides_count):
                    page.evaluate(f"current = {i}; update();")
                    page.wait_for_timeout(200)
                    slide_elem = page.locator(".slide.active")
                    png_path = os.path.join(png_dir, f"slide-{i+1:02d}.png")
                    slide_elem.screenshot(path=png_path)
                    print(f"  [OK] Salvo: {png_path}")

                browser.close()
            print(f"[SUCESSO] Todos os {slides_count} slides exportados em: {png_dir}")
        except ImportError:
            print("[AVISO] Playwright nao encontrado. Instale com 'pip install playwright' para exportacao automatica.")


if __name__ == "__main__":
    main()
