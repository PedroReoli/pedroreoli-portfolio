# scripts/ — automação do ReoliOS

Scripts Node.js que as skills chamam pra executar ações fora do alcance da IA pura (gerar imagem, postar em rede social, renderizar HTML em PNG).

## Scripts disponíveis

| Script | Skill que usa | O que faz |
|--------|---------------|-----------|
| `render.js` | `/carrossel` | Playwright renderiza cada `.slide` do HTML em PNG 1080x1350 |
| `gerar-imagem.js` | `/carrossel` (com foto IA) | Gera foto realista via OpenAI DALL-E 3 |
| `postar-instagram.js` | `/aprovar-post` | Publica carrossel no Instagram via Meta Graph API |
| `postar-facebook.js` | `/aprovar-post` | Publica carrossel no Facebook via Meta Graph API |

## Setup

**1. Instalar dependências:**
```bash
npm install
npx playwright install chromium
```

**2. Configurar `.env` na raiz do projeto** (copiar de `.env.example`):
```bash
OPENAI_API_KEY=sk-...
META_PAGE_ACCESS_TOKEN=...
META_PAGE_ID=...
META_IG_USER_ID=...
SITE_URL=https://pedroreis.vercel.app/img/posts
```

## Uso

```bash
# Renderizar carrossel em PNGs
node scripts/render.js marketing/conteudo/meu-post/carrossel.html

# Gerar foto com IA
node scripts/gerar-imagem.js "Professional photo of..." "marketing/conteudo/foto.png"

# Postar no Instagram
node scripts/postar-instagram.js marketing/conteudo/meu-post/

# Postar no Facebook
node scripts/postar-facebook.js marketing/conteudo/meu-post/
```

## Requisitos

- Node.js 18+
- Playwright (pra render.js)
- Chaves de API configuradas no `.env`
