/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HERO_VIDEO_ENABLED?: "true" | "false"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
