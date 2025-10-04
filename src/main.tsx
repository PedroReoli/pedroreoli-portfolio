// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./globals.css"
import "./i18n/i18n" // Importar configuração do i18n

// Configurando o root com overflow-x-hidden para garantir que não haja scroll lateral
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
