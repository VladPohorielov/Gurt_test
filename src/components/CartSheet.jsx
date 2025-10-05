import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

export default function Cart({ isOpen, onClose, children }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md bg-brand-black text-white border-white/10 flex flex-col h-full"
        aria-describedby="cart-description"
      >
        <SheetHeader className="text-left flex-shrink-0">
          <SheetTitle className="text-white flex items-center gap-2">
            Кошик 
            {getTotalItems() > 0 && (
              <Badge variant="secondary" className="bg-brand-yellow text-brand-black">
                {getTotalItems()}
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription className="text-white/70" id="cart-description">
            Ваші обрані товари. Використовуйте Escape для закриття кошика.
          </SheetDescription>
        </SheetHeader>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 mt-6">
          {/* Scrollable Items */}
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/60 mb-4">Ваш кошик порожній</p>
                <SheetClose asChild>
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Link to="/catalog">
                      Переглянути каталог
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            ) : (
              cartItems.map(item => (
                <article
                  key={`${item.id}-${item.size || 'default'}`}
                  className="glass p-4 flex gap-3 items-start"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-medium text-sm line-clamp-2">{item.title}</h3>
                    
                    <div className="text-xs text-white/70 mt-1">
                      {item.size && (
                        <span>Розмір: {item.size} • </span>
                      )}
                      <span className="text-brand-yellow font-medium">{item.price} грн</span>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-white hover:bg-white/10"
                          onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm font-medium text-white">
                          {item.quantity}
                        </span>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-white hover:bg-white/10"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-white/60 hover:text-red-400 hover:bg-red-400/10"
                        onClick={() => removeFromCart(item.id, item.size)}
                        aria-label={`Видалити ${item.title} з кошика`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
          
          {/* Fixed Footer */}
          {cartItems.length > 0 && (
            <div className="flex-shrink-0 border-t border-white/10 pt-4 space-y-4 bg-brand-black">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Загалом:</span>
                <span className="text-brand-yellow font-semibold text-xl">
                  {getTotalPrice()} грн
                </span>
              </div>
              
              <div className="space-y-2">
                <SheetClose asChild>
                  <Button asChild className="w-full bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 h-12">
                    <Link to="/checkout">
                      Оформити замовлення
                    </Link>
                  </Button>
                </SheetClose>
                
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 h-10"
                  onClick={clearCart}
                >
                  Очистити кошик
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}