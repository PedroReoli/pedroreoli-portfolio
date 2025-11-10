"use client"

import { useEffect } from "react"

const App = () => {
  useEffect(() => {
    window.location.href = "https://pedroreoli.vercel.app/"
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <p>Redirecionando para <a href="https://pedroreoli.vercel.app/">https://pedroreoli.vercel.app/</a>...</p>
    </div>
  )
}

export default App
