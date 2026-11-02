"""
dom_parser.py — Converte DOM em arvore semantica compacta, Markdown e mapa de formulários
"""
import re
from typing import Dict, Any, List


class DOMSemanticExtractor:
    JS_EXTRACT_TREE = """
    () => {
        let idCounter = 1;
        const interactiveElements = [];
        const formsData = [];

        // 1. Extração de elementos interativos e semânticos
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode(node) {
                    if (['SCRIPT', 'STYLE', 'SVG', 'NOSCRIPT', 'IFRAME'].includes(node.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    const style = window.getComputedStyle(node);
                    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let currentNode = walker.nextNode();
        while (currentNode) {
            const tag = currentNode.tagName.toLowerCase();
            const isButton = tag === 'button' || currentNode.getAttribute('role') === 'button' || currentNode.type === 'button' || currentNode.type === 'submit';
            const isInput = ['input', 'textarea', 'select'].includes(tag);
            const isLink = tag === 'a' && currentNode.href;
            
            if (isButton || isInput || isLink) {
                const rect = currentNode.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    const text = (currentNode.innerText || currentNode.placeholder || currentNode.getAttribute('aria-label') || currentNode.value || '').trim().replace(/\\s+/g, ' ');
                    const item = {
                        id: idCounter++,
                        tag: tag,
                        type: currentNode.type || tag,
                        name: currentNode.name || '',
                        label: text.substring(0, 100),
                        placeholder: currentNode.placeholder || '',
                        value: (currentNode.value || '').substring(0, 100),
                        href: currentNode.href || '',
                        required: currentNode.required || false,
                        disabled: currentNode.disabled || false,
                        bounds: {
                            x: Math.round(rect.x),
                            y: Math.round(rect.y),
                            width: Math.round(rect.width),
                            height: Math.round(rect.height)
                        }
                    };
                    interactiveElements.push(item);
                    
                    if (isInput) {
                        formsData.push(item);
                    }
                }
            }
            currentNode = walker.nextNode();
        }

        // 2. Extração de rotas internas e SPA
        const currentOrigin = window.location.origin;
        const internalLinks = Array.from(document.querySelectorAll('a[href]'))
            .map(a => a.href)
            .filter(href => href.startsWith(currentOrigin) || href.startsWith('/'))
            .map(href => href.replace(currentOrigin, ''))
            .filter((v, i, a) => a.indexOf(v) === i && v.length > 0);

        // 3. Inspeção de Next.js / React Router / Single Page Apps
        const spaRoutes = [];
        if (window.__NEXT_DATA__ && window.__NEXT_DATA__.page) {
            spaRoutes.push(window.__NEXT_DATA__.page);
        }

        return {
            title: document.title,
            url: window.location.href,
            elements: interactiveElements,
            forms: formsData,
            internal_routes: internalLinks,
            spa_context: {
                is_nextjs: !!window.__NEXT_DATA__,
                is_react: !!(window.React || document.querySelector('[data-reactroot], #__next, #root')),
                spa_routes: spaRoutes
            }
        };
    }
    """

    @staticmethod
    def format_tree_for_llm(elements: List[Dict[str, Any]]) -> str:
        """Formata elementos para a IA em um formato conciso e determinístico de baixo consumo de tokens."""
        lines = []
        for el in elements:
            el_id = el["id"]
            tag = el["tag"]
            el_type = el.get("type", tag)
            label = el.get("label", "")
            placeholder = el.get("placeholder", "")
            extra = f' placeholder="{placeholder}"' if placeholder else ""
            val = f' value="{el["value"]}"' if el.get("value") else ""
            
            if tag == "a":
                lines.append(f'[{el_id:02d}] Link: "{label}" ➔ {el.get("href", "")}')
            elif tag in ("input", "textarea", "select"):
                lines.append(f'[{el_id:02d}] Campo [{el_type}]: "{label}"{extra}{val}')
            elif tag == "button" or el_type in ("button", "submit"):
                lines.append(f'[{el_id:02d}] Botao: "{label}"')
            else:
                lines.append(f'[{el_id:02d}] {tag.upper()}: "{label}"')
        return "\n".join(lines)
