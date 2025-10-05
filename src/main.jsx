
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import App from './App.jsx'
import './index.css'

// Robust basename handling for GitHub Pages
const BASENAME = import.meta.env.BASE_URL || '/Gurt_test/'
console.log('Using basename:', BASENAME)

// Load integration tests in development
// if (import.meta.env.DEV) {
//   import('./utils/testIntegration.js')
//   import('./utils/warningChecker.js')
//   import('./utils/lightRaysTest.js')
// }

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter 
        basename={BASENAME}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
)
