// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import RootLayout from "@/layout/RootLayout"
import MainPage from "@/pages/MainPage"

const App = () => {
  // Adicionando um wrapper com overflow-x-hidden para prevenir scroll lateral
  // Isso garante que nenhum elemento filho cause overflow horizontal
  return (
    <div className="relative overflow-x-hidden w-full">
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App

