---
tipo: "regra_reolicode"
nome: "Regra — Regra para Armazenamento em Nuvem e CDN (Storage)"
camada: "90-integrations"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","90-integrations"]
hub_pai: "[[REOLI]]"
aliases: ["Regra para Armazenamento em Nuvem e CDN (Storage)"]
---

# Regra para Armazenamento em Nuvem e CDN (Storage)

## Objetivo

Definir padrões de integração com serviços de armazenamento de arquivos em nuvem (AWS S3, Cloudflare R2, Supabase Storage, Google Cloud Storage).

## Regras

* **Uploads Diretos via URLs Pré-assinadas (Presigned URLs)**:
  - Evite trafegar o binário do arquivo pelo servidor backend da aplicação.
  - O cliente solicita ao backend uma URL de upload pré-assinada (`presigned upload URL`) e faz o upload diretamente para o serviço de storage.

* **Políticas de Acesso (Público vs Privado)**:
  - Arquivos públicos (ex: avatares públicos, imagens de produtos) devem ser servidos via CDN com cache controlado.
  - Arquivos privados ou sensíveis (ex: documentos de usuários, notas fiscais, relatórios) DEVEM ser armazenados em buckets privados e servidos APENAS via URLs temporárias pré-assinadas com tempo de expiração curto.

* **Validação de Uploads**:
  - O backend deve validar o nome, tipo MIME e tamanho máximo permitido do arquivo ANTES de gerar a URL pré-assinada.
  - O backend deve gerar um nome único e imprevisível para o arquivo no storage (ex: UUID + extensão), evitando sobrescrever arquivos existentes ou permitir enumeração.

[Catálogo de regras](../README.md)
