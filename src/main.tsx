import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource-variable/archivo/standard.css"
import "@fontsource/ibm-plex-mono/latin-400.css"
import "@fontsource/ibm-plex-mono/latin-500.css"
import "@fontsource/ibm-plex-mono/latin-600.css"
import App from "./App"
import "./index.css"

const rootElement = document.getElementById("root")!

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
