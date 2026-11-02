#!/usr/bin/env node

/**
 * postar-facebook.js
 *
 * Publica um carrossel (múltiplas fotos) em uma Facebook Page
 * via Meta Graph API v25.0.
 *
 * Uso:
 *   node scripts/postar-facebook.js <caminho-da-pasta>
 *
 * A pasta deve conter:
 *   - instagram/slide-01.png, slide-02.png, ... (imagens do carrossel)
 *   - legenda.md (texto da legenda do post)
 *
 * Variáveis de ambiente (.env na raiz do projeto):
 *   META_PAGE_ACCESS_TOKEN — Token de acesso da página
 *   META_PAGE_ID — ID da Facebook Page
 *   SITE_URL — URL base onde as imagens estão hospedadas publicamente
 */

const fs = require("fs");
const path = require("path");

// Carrega .env da raiz do projeto
const envPath = path.resolve(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

// --- Configuração ---
const ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.META_PAGE_ID;
const SITE_URL = process.env.SITE_URL;
const API_VERSION = "v25.0";
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

// --- Validações ---
function validarConfig() {
  const erros = [];
  if (!ACCESS_TOKEN) erros.push("META_PAGE_ACCESS_TOKEN não definido no .env");
  if (!PAGE_ID) erros.push("META_PAGE_ID não definido no .env");
  if (!SITE_URL) erros.push("SITE_URL não definido no .env");
  if (erros.length > 0) {
    console.error("❌ Erros de configuração:");
    erros.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }
}

// --- Utilitários ---
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function apiPost(endpoint, params) {
  const url = `${BASE_URL}${endpoint}`;
  const body = { ...params, access_token: ACCESS_TOKEN };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    const err = data.error || { message: `HTTP ${response.status}` };
    throw new Error(
      `API Error [${err.code || response.status}]: ${err.message}` +
        (err.error_subcode ? ` (subcode: ${err.error_subcode})` : "")
    );
  }

  return data;
}

// --- Fluxo principal ---
async function postarCarrossel(pastaConteudo) {
  // 1. Ler legenda
  const legendaPath = path.join(pastaConteudo, "legenda.md");
  if (!fs.existsSync(legendaPath)) {
    throw new Error(`Arquivo legenda.md não encontrado em: ${pastaConteudo}`);
  }
  const legenda = fs.readFileSync(legendaPath, "utf-8").trim();
  console.log(`📝 Legenda: "${legenda.slice(0, 80)}${legenda.length > 80 ? "..." : ""}"`);

  // 2. Encontrar imagens na subpasta instagram/
  const instagramDir = path.join(pastaConteudo, "instagram");
  if (!fs.existsSync(instagramDir)) {
    throw new Error(
      `Pasta instagram/ não encontrada em: ${pastaConteudo}\n` +
        `   Esperado: ${instagramDir}`
    );
  }

  const imagens = fs
    .readdirSync(instagramDir)
    .filter((f) => /\.(png|jpg|jpeg)$/i.test(f))
    .sort();

  if (imagens.length === 0) {
    throw new Error(`Nenhuma imagem encontrada em: ${instagramDir}`);
  }

  console.log(`🖼️  ${imagens.length} imagens encontradas`);

  // 3. Upload de cada foto como "unpublished" (published=false)
  const photoIds = [];

  for (const imagem of imagens) {
    const imageUrl = `${SITE_URL.replace(/\/$/, "")}/${imagem}`;

    console.log(`   ⬆️  Enviando foto: ${imagem}`);
    console.log(`      URL: ${imageUrl}`);

    const result = await apiPost(`/${PAGE_ID}/photos`, {
      url: imageUrl,
      published: false,
    });

    photoIds.push(result.id);
    console.log(`      ✅ Photo ID: ${result.id}`);

    // Pequena pausa entre requests para evitar rate limit
    await sleep(1000);
  }

  // 4. Criar post no feed com todas as fotos anexadas
  console.log(`\n🚀 Publicando post com ${photoIds.length} fotos...`);

  const feedParams = {
    message: legenda,
  };

  // Montar attached_media como array de objetos
  // A API aceita attached_media[0], attached_media[1], etc.
  // Mas via JSON, enviamos como array
  photoIds.forEach((id, index) => {
    feedParams[`attached_media[${index}]`] = JSON.stringify({
      media_fbid: id,
    });
  });

  // Para o endpoint /feed, precisamos enviar como form-urlencoded
  // porque attached_media usa notação de array
  const formBody = new URLSearchParams();
  formBody.append("message", legenda);
  formBody.append("access_token", ACCESS_TOKEN);
  photoIds.forEach((id, index) => {
    formBody.append(
      `attached_media[${index}]`,
      JSON.stringify({ media_fbid: id })
    );
  });

  const feedUrl = `${BASE_URL}/${PAGE_ID}/feed`;
  const response = await fetch(feedUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody.toString(),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    const err = data.error || { message: `HTTP ${response.status}` };
    throw new Error(
      `API Error [${err.code || response.status}]: ${err.message}` +
        (err.error_subcode ? ` (subcode: ${err.error_subcode})` : "")
    );
  }

  console.log(`\n✅ Post publicado com sucesso no Facebook!`);
  console.log(`   Post ID: ${data.id}`);
  console.log(
    `   Link: https://www.facebook.com/${data.id.replace("_", "/posts/")}`
  );

  return data;
}

// --- Execução ---
async function main() {
  validarConfig();

  const pastaArg = process.argv[2];
  if (!pastaArg) {
    console.error("Uso: node scripts/postar-facebook.js <caminho-da-pasta>");
    console.error("");
    console.error("A pasta deve conter:");
    console.error("  - instagram/slide-01.png, slide-02.png, ...");
    console.error("  - legenda.md");
    process.exit(1);
  }

  const pastaConteudo = path.resolve(pastaArg);
  if (!fs.existsSync(pastaConteudo)) {
    console.error(`❌ Pasta não encontrada: ${pastaConteudo}`);
    process.exit(1);
  }

  console.log(`\n🎯 Postando carrossel no Facebook`);
  console.log(`   Pasta: ${pastaConteudo}`);
  console.log(`   Page ID: ${PAGE_ID}`);
  console.log("");

  await postarCarrossel(pastaConteudo);
}

main().catch((err) => {
  console.error(`\n❌ Erro: ${err.message}`);
  if (err.message.includes("190")) {
    console.error("   💡 Dica: Token de acesso inválido ou expirado.");
    console.error(
      "   Gere um novo token em: https://developers.facebook.com/tools/explorer/"
    );
  }
  if (err.message.includes("200")) {
    console.error("   💡 Dica: Permissões insuficientes.");
    console.error(
      "   Necessário: pages_manage_posts, pages_read_engagement"
    );
  }
  if (err.message.includes("80001")) {
    console.error("   💡 Dica: Rate limit atingido. Aguarde alguns minutos.");
  }
  process.exit(1);
});
