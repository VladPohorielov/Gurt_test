import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Cart from './Cart'

export default function Navbar(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-brand-black/80 border-b border-white/5">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="font-semibold tracking-wide text-brand-yellow hover:opacity-80 transition-opacity focus:outline focus:outline-2 focus:outline-brand-yellow/60">
          GURT
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <NavLink to="/catalog" className={({isActive}) => isActive ? "text-brand-yellow" : "text-white/80 hover:text-white focus:outline focus:outline-2 focus:outline-brand-yellow/60 transition-colors"}>
            Каталог
          </NavLink>
          <NavLink to="/payment-and-delivery" className={({isActive}) => isActive ? "text-brand-yellow" : "text-white/80 hover:text-white focus:outline focus:outline-2 focus:outline-brand-yellow/60 transition-colors"}>
            Оплата/Доставка
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "text-brand-yellow" : "text-white/80 hover:text-white focus:outline focus:outline-2 focus:outline-brand-yellow/60 transition-colors"}>
            Про нас
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "text-brand-yellow" : "text-white/80 hover:text-white focus:outline focus:outline-2 focus:outline-brand-yellow/60 transition-colors"}>
            Контакти
          </NavLink>
        </div>

        {/* Cart Icon - показується завжди */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white hover:text-brand-yellow transition-colors focus:outline focus:outline-2 focus:outline-brand-yellow/60 rounded-lg"
            aria-label={`Кошик (${getTotalItems()} товарів)`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7.5H19.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
            </svg>
            
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white hover:text-brand-yellow transition-colors focus:outline focus:outline-2 focus:outline-brand-yellow/60 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Відкрити меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-brand-black/95 backdrop-blur">
          <div className="container py-4 space-y-2">
            <NavLink 
              to="/catalog" 
              className={({isActive}) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? "text-brand-yellow bg-brand-yellow/10" : "text-white/80 hover:text-white hover:bg-white/5"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Каталог
            </NavLink>
            <NavLink 
              to="/payment-and-delivery" 
              className={({isActive}) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? "text-brand-yellow bg-brand-yellow/10" : "text-white/80 hover:text-white hover:bg-white/5"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Оплата/Доставка
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive}) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? "text-brand-yellow bg-brand-yellow/10" : "text-white/80 hover:text-white hover:bg-white/5"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Про нас
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? "text-brand-yellow bg-brand-yellow/10" : "text-white/80 hover:text-white hover:bg-white/5"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Контакти
            </NavLink>
          </div>
        </div>
      )}
      
      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  )
}
