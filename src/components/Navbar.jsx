import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { ShoppingCart, Menu } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartSheet from './CartSheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Navbar(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()
  
  return (
    <nav className="relative z-20 sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-brand-black/80 border-b border-white/5">
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
          <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm" 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 text-white hover:text-brand-yellow hover:bg-white/10"
                    aria-label={`Відкрити кошик (${getTotalItems()} товарів)`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {getTotalItems() > 0 && (
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-brand-yellow text-brand-black text-xs font-bold flex items-center justify-center"
                      >
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Кошик ({getTotalItems()} товарів)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CartSheet>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2 text-white hover:text-brand-yellow hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
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
      

    </nav>
  )
}
