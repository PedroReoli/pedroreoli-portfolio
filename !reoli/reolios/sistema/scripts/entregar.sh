#!/bin/bash
# ReoliOS — Script de Entrega por Tier
# Uso: ./entregar.sh [starter|pro|business]
# Prepara a branch correta para cada plano

set -e

TIER=$1

if [ "$TIER" != "starter" ] && [ "$TIER" != "pro" ] && [ "$TIER" != "business" ]; then
  echo "Uso: ./entregar.sh [starter|pro|business]"
  exit 1
fi

echo "▶ Preparando entrega para: $TIER"

# Volta pra main (referência limpa)
git checkout main 2>/dev/null || true
git pull origin main 2>/dev/null || true

if [ "$TIER" == "pro" ]; then
  echo "✓ Pro é a branch main — nada a fazer"
  echo ""
  echo "Comando pro cliente:"
  echo "  git clone https://github.com/PedroReoli/skill-ReoliOS.git"
  exit 0
fi

# Criar branch a partir da main
BRANCH="${TIER}-branch"
git branch -D "$BRANCH" 2>/dev/null || true
git checkout -b "$BRANCH"

# Remover skills que não pertencem a este tier
if [ "$TIER" == "starter" ]; then
  echo "→ Removendo skills do Starter..."
  rm -rf .claude/skills/ads/
  rm -rf .claude/skills/dev/
  rm -rf .claude/skills/devops/
  rm -rf .claude/skills/database/
  rm -rf .claude/skills/pagamento/
  rm -rf .claude/skills/qualidade/
  rm -rf .claude/skills/comunicacao/
  rm -rf .claude/skills/performance/
  rm -rf .claude/skills/mercado/
  rm -rf .claude/skills/documentacao/
  rm -rf sistema/scripts/

  # Ajustar README para refletir Starter
  echo "→ Ajustando documentação..."
fi

if [ "$TIER" == "business" ]; then
  echo "→ Configurando white-label..."
  # Business usa tudo da main + extras white-label
  # (por enquanto, a diferença é contratual, não técnica)
fi

# Commit
git add -A
git commit -m "chore: configurar branch para plano $TIER"

echo ""
echo "✓ Branch '$BRANCH' pronta!"
echo ""
echo "Comando pro cliente:"
echo "  git clone -b $BRANCH https://github.com/PedroReoli/skill-ReoliOS.git meu-negocio"
