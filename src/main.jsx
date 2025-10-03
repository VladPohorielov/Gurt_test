
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import App from './App.jsx'
import './index.css'

// Robust basename handling for GitHub Pages
const BASENAME = import.meta.env.BASE_URL || '/Gurt_test/'
console.log('Using basename:', BASENAME)

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter basename={BASENAME}>
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
)
