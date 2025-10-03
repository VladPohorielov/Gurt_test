
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import App from './App.jsx'
import './index.css'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter basename="/Gurt_test">
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
)
