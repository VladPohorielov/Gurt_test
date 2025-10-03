import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()

  // Lock body scroll when cart is open
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  const CartDrawer = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[100]"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 z-[110] h-screen w-full sm:w-[420px] bg-brand-black text-white shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Кошик"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="text-lg font-semibold">Кошик ({getTotalItems()})</div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 focus:outline focus:outline-2 focus:outline-brand-yellow/60"
            aria-label="Закрити кошик"
          >
            ✕
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="px-5 py-4 overflow-y-auto grow space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-white/70 text-center py-8">
              <p>Кошик порожній</p>
              <p className="text-sm mt-2">Додайте товари з каталогу</p>
            </div>
          ) : (
            cartItems.map(item => (
              <article
                key={`${item.id}-${item.size || 'default'}`}
                className="glass p-3 flex gap-3 items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width="80"
                  height="80"
                  className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0 grow">
                  <h3 className="text-white truncate font-medium">{item.title}</h3>
                  <div className="text-sm text-white/70">
                    {item.size && (
                      <>
                        Розмір: <span className="text-white">{item.size}</span> • {' '}
                      </>
                    )}
                    Ціна: <span className="text-brand-yellow font-medium">{item.price} грн</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                        onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                        aria-label="Зменшити кількість"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        aria-label="Збільшити кількість"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="ml-auto text-white/60 hover:text-red-400 transition-colors text-sm"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Footer - Fixed */}
        {cartItems.length > 0 && (
          <div className="px-5 py-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80">Загалом:</span>
              <span className="text-brand-yellow font-semibold text-xl">
                {getTotalPrice()} грн
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-brand-yellow text-brand-black rounded-2xl py-3 font-medium hover:opacity-90 transition-opacity mb-3"
            >
              Оформити замовлення
            </Link>
            <button
              onClick={clearCart}
              className="block w-full text-center border border-white/15 rounded-2xl py-3 text-white/90 hover:bg-white/10 transition-colors"
            >
              Очистити кошик
            </button>
          </div>
        )}
      </aside>
    </>
  )

  // Render through portal to avoid overflow-hidden issues
  return createPortal(CartDrawer, document.body)
}