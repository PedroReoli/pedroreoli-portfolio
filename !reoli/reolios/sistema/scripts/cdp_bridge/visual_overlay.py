"""
visual_overlay.py — Injeção de Destaque Visual e Badges no Chrome Real (Porta 9222)
"""

JS_INJECT_OVERLAY = """
() => {
    const existing = document.getElementById('reoli-cdp-overlay-root');
    if (existing) existing.remove();

    const root = document.createElement('div');
    root.id = 'reoli-cdp-overlay-root';
    root.style.position = 'absolute';
    root.style.top = '0';
    root.style.left = '0';
    root.style.width = '100%';
    root.style.height = '100%';
    root.style.pointerEvents = 'none';
    root.style.zIndex = '2147483647';
    document.body.appendChild(root);

    const interactiveSelectors = 'button, a, input, select, textarea, [role="button"], [role="link"], [role="checkbox"], [tabindex="0"]';
    const elements = Array.from(document.querySelectorAll(interactiveSelectors));
    let idCounter = 1;

    for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) continue;
        const style = window.getComputedStyle(el);
        if (style.visibility === 'hidden' || style.display === 'none' || style.opacity === '0') continue;

        const badge = document.createElement('div');
        badge.innerText = '#' + idCounter;
        badge.style.position = 'absolute';
        badge.style.left = (window.scrollX + rect.left) + 'px';
        badge.style.top = (window.scrollY + rect.top) + 'px';
        badge.style.background = '#38bdf8';
        badge.style.color = '#0f172a';
        badge.style.fontFamily = 'monospace';
        badge.style.fontSize = '11px';
        badge.style.fontWeight = 'bold';
        badge.style.padding = '1px 5px';
        badge.style.borderRadius = '4px';
        badge.style.boxShadow = '0 2px 5px rgba(0,0,0,0.4)';
        badge.style.border = '1px solid #0284c7';
        badge.style.pointerEvents = 'none';
        
        const highlightBox = document.createElement('div');
        highlightBox.style.position = 'absolute';
        highlightBox.style.left = (window.scrollX + rect.left) + 'px';
        highlightBox.style.top = (window.scrollY + rect.top) + 'px';
        highlightBox.style.width = rect.width + 'px';
        highlightBox.style.height = rect.height + 'px';
        highlightBox.style.border = '1.5px dashed #38bdf8';
        highlightBox.style.borderRadius = '4px';
        highlightBox.style.pointerEvents = 'none';

        root.appendChild(highlightBox);
        root.appendChild(badge);
        idCounter++;
    }

    return { total_badges: idCounter - 1 };
}
"""

JS_REMOVE_OVERLAY = """
() => {
    const existing = document.getElementById('reoli-cdp-overlay-root');
    if (existing) {
        existing.remove();
        return { removed: true };
    }
    return { removed: false };
}
"""
