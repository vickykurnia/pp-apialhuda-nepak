import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/main.css' // <-- Diubah mengarah ke folder css/main.css
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)