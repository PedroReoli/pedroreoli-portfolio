#!/usr/bin/env node

/**
 * postar-instagram.js
 *
 * Publica um carrossel (múltiplas imagens) no Instagram Business
 * via Meta Graph API v25.0.
 *
 * Uso:
 *   node scripts/postar-instagram.js <caminho-da-pasta>
 *
 * A pasta deve conter:
 *   - instagram/slide-01.png, slide-02.png, ... (até 10 imagens)
 *   - legenda.md (texto da legenda do post)
 *
 * Variáveis de ambiente (.env na raiz do projeto):
 *   META_PAGE_ACCESS_TOKEN — Token de acesso da página (com permissões IG)
 *   META_IG_USER_ID — ID do usuário Instagram Business
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
const IG_USER_ID = process.env.META_IG_USER_ID;
const SITE_URL = process.env.SITE_URL;
const API_VERSION = "v25.0";
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

// --- Validações ---
function validarConfig() {
  const erros = [];
  if (!ACCESS_TOKEN) erros.push("META_PAGE_ACCESS_TOKEN não definido no .env");
  if (!IG_USER_ID) erros.push("META_IG_USER_ID não definido no .env");
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

async function apiGet(endpoint, params = {}) {
  const searchParams = new URLSearchParams({
    ...params,
    access_token: ACCESS_TOKEN,
  });
  const url = `${BASE_URL}${endpoint}?${searchParams}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    const err = data.error || { message: `HTTP ${response.status}` };
    throw new Error(`API Error: ${err.message}`);
  }

  return data;
}

/**
 * Aguarda um container ficar pronto (status FINISHED).
 * Faz polling a cada 5s por até 2 minutos.
 */
async function aguardarContainer(containerId, tentativas = 24) {
  for (let i = 0; i < tentativas; i++) {
    const data = await apiGet(`/${containerId}`, {
      fields: "status_code,status",
    });

    if (data.status_code === "FINISHED") {
      return true;
    }

    if (data.status_code === "ERROR") {
      throw new Error(
        `Container ${containerId} falhou: ${data.status || "erro desconhecido"}`
      );
    }

    if (data.status_code === "EXPIRED") {
      throw new Error(`Container ${containerId} expirou.`);
    }

    // IN_PROGRESS — aguardar
    await sleep(5000);
  }

  throw new Error(
    `Timeout: container ${containerId} não ficou pronto em 2 minutos.`
  );
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

  if (imagens.length > 10) {
    throw new Error(
      `Instagram permite no máximo 10 imagens por carrossel. Encontradas: ${imagens.length}`
    );
  }

  console.log(`🖼️  ${imagens.length} imagens encontradas`);

  // 3. Criar containers individuais (is_carousel_item = true)
  const containerIds = [];

  for (const imagem of imagens) {
    // A imagem precisa estar acessível publicamente via URL
    const imageUrl = `${SITE_URL.replace(/\/$/, "")}/${imagem}`;

    console.log(`   ⬆️  Criando container para: ${imagem}`);
    console.log(`      URL: ${imageUrl}`);

    const result = await apiPost(`/${IG_USER_ID}/media`, {
      image_url: imageUrl,
      is_carousel_item: true,
    });

    containerIds.push(result.id);
    console.log(`      ✅ Container: ${result.id}`);

    // Pequena pausa entre requests para evitar rate limit
    await sleep(1000);
  }

  // 4. Aguardar todos os containers ficarem prontos
  console.log(`\n⏳ Aguardando processamento dos containers...`);
  for (const id of containerIds) {
    await aguardarContainer(id);
  }
  console.log(`   ✅ Todos os containers prontos`);

  // 5. Criar container do carrossel
  console.log(`\n📦 Criando container do carrossel...`);
  const carouselResult = await apiPost(`/${IG_USER_ID}/media`, {
    media_type: "CAROUSEL",
    children: containerIds.join(","),
    caption: legenda,
  });

  const carouselContainerId = carouselResult.id;
  console.log(`   ✅ Carousel container: ${carouselContainerId}`);

  // 6. Aguardar carousel container ficar pronto
  console.log(`\n⏳ Aguardando processamento do carrossel...`);
  await aguardarContainer(carouselContainerId);

  // 7. Publicar
  console.log(`\n🚀 Publicando...`);
  const publishResult = await apiPost(`/${IG_USER_ID}/media_publish`, {
    creation_id: carouselContainerId,
  });

  console.log(`\n✅ Carrossel publicado com sucesso!`);
  console.log(`   Media ID: ${publishResult.id}`);
  console.log(
    `   Link: https://www.instagram.com/p/${publishResult.id}/`
  );

  return publishResult;
}

// --- Verificar limite de publicação ---
async function verificarLimite() {
  try {
    const data = await apiGet(`/${IG_USER_ID}/content_publishing_limit`, {
      fields: "config,quota_usage",
    });
    const usage = data.quota_usage || 0;
    const limit = data.config?.quota_total || 100;
    console.log(`📊 Uso de publicação: ${usage}/${limit} nas últimas 24h`);

    if (usage >= limit) {
      throw new Error(
        `Limite de publicação atingido (${usage}/${limit}). Aguarde 24h.`
      );
    }
  } catch (err) {
    // Se não conseguir verificar, continua (endpoint pode não estar disponível)
    if (!err.message.includes("Limite de publicação")) {
      console.warn(`⚠️  Não foi possível verificar limite: ${err.message}`);
    } else {
      throw err;
    }
  }
}

// --- Execução ---
async function main() {
  validarConfig();

  const pastaArg = process.argv[2];
  if (!pastaArg) {
    console.error("Uso: node scripts/postar-instagram.js <caminho-da-pasta>");
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

  console.log(`\n🎯 Postando carrossel no Instagram`);
  console.log(`   Pasta: ${pastaConteudo}`);
  console.log(`   IG User ID: ${IG_USER_ID}`);
  console.log("");

  await verificarLimite();
  await postarCarrossel(pastaConteudo);
}

main().catch((err) => {
  console.error(`\n❌ Erro: ${err.message}`);
  if (err.message.includes("OAuthException")) {
    console.error("   💡 Dica: Verifique se o token de acesso ainda é válido.");
    console.error(
      "   Tokens de página de longa duração duram ~60 dias."
    );
  }
  process.exit(1);
});
