import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Configuração para lidar com rotas de idioma no desenvolvimento
    proxy: {
      // Redirecionar todas as rotas para index.html 
      "^/(pt|en|es)": {
        target: "http://localhost:5173",
        rewrite: () => "/index.html",
      },
    },
  },
})
