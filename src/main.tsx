// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./globals.css" // Corrigido o caminho de importação

// Configurando o root com overflow-x-hidden para garantir que não haja scroll lateral
// em nenhum nível da aplicação
const rootElement = document.getElementById("root")!
// Garantindo que o elemento root tenha as propriedades corretas
if (rootElement) {
  rootElement.style.position = "relative"
  rootElement.style.overflowX = "hidden"
  rootElement.style.width = "100%"
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

