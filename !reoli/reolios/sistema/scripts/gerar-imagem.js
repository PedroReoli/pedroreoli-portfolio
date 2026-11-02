#!/usr/bin/env node

/**
 * gerar-imagem.js
 *
 * Gera imagens via OpenAI Images API (dall-e-3).
 *
 * Uso:
 *   node scripts/gerar-imagem.js "prompt descritivo" "caminho/saida.png"
 *
 * Variáveis de ambiente (.env na raiz do projeto):
 *   OPENAI_API_KEY — Chave da API OpenAI
 */

const fs = require("fs");
const path = require("path");

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

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error("❌ OPENAI_API_KEY não definido no .env");
  process.exit(1);
}

async function gerarImagem(prompt, outputPath) {
  console.log(`\n🎨 Gerando imagem...`);
  console.log(`   Prompt: "${prompt.slice(0, 100)}${prompt.length > 100 ? "..." : ""}"`);
  console.log(`   Destino: ${outputPath}`);
  console.log(`   Modelo: dall-e-3`);
  console.log(`   Tamanho: 1024x1792 (retrato)`);
  console.log("");

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1792",
      quality: "hd",
      style: "natural",
      response_format: "b64_json",
    }),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    const err = data.error || { message: `HTTP ${response.status}` };
    throw new Error(`OpenAI API Error: ${err.message}`);
  }

  const imageData = data.data[0];

  if (imageData.revised_prompt) {
    console.log(`   📝 Prompt revisado pela IA: "${imageData.revised_prompt.slice(0, 120)}..."`);
  }

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const buffer = Buffer.from(imageData.b64_json, "base64");
  fs.writeFileSync(outputPath, buffer);

  const sizeKB = (buffer.length / 1024).toFixed(1);
  console.log(`\n✅ Imagem gerada com sucesso!`);
  console.log(`   Arquivo: ${outputPath} (${sizeKB} KB)`);

  return outputPath;
}

async function main() {
  const prompt = process.argv[2];
  const output = process.argv[3];

  if (!prompt || !output) {
    console.error("Uso: node scripts/gerar-imagem.js \"prompt\" \"caminho/saida.png\"");
    console.error("");
    console.error("Exemplo:");
    console.error('  node scripts/gerar-imagem.js "Professional photo of artisan bread" "marketing/conteudo/foto-pao.png"');
    process.exit(1);
  }

  const outputPath = path.resolve(output);
  await gerarImagem(prompt, outputPath);
}

main().catch((err) => {
  console.error(`\n❌ Erro: ${err.message}`);
  if (err.message.includes("billing")) {
    console.error("   💡 Dica: Verifique se sua conta OpenAI tem créditos.");
  }
  if (err.message.includes("rate_limit")) {
    console.error("   💡 Dica: Rate limit atingido. Aguarde 1 minuto.");
  }
  process.exit(1);
});
