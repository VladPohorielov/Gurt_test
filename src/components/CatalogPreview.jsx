import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import data from '../data/products.json'

// Показуємо перші 6 товарів як хіти
const featuredProducts = data.slice(0, 6)

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  
  const handleAddToCart = async () => {
    if (!product.inStock) return
    
    setIsAdding(true)
    const defaultSize = product.sizes && product.sizes.length > 0 ? (product.sizes.includes('M') ? 'M' : product.sizes[0]) : ''
    
    try {
      addToCart(product, defaultSize, 1)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
    
    // Короткий feedback для користувача
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <div className="glass rounded-2xl overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block relative">
        <img 
          src={product.img} 
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white/80 font-medium">Немає в наявності</span>
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-medium mb-2 group-hover:text-brand-yellow transition line-clamp-1">
            {product.title}
          </h3>
        </Link>
        
        {/* Опис товару */}
        <p className="text-white/70 text-sm mb-3 line-clamp-2">
          {product.desc}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-brand-yellow font-semibold text-lg">
            {product.price} грн
          </p>
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-1">
              {product.sizes.map(size => (
                <span key={size} className="text-xs px-2 py-1 rounded bg-white/10 text-white/80">
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className="w-full bg-brand-yellow text-brand-black py-2 px-4 rounded-xl font-medium hover:opacity-90 transition focus:outline focus:outline-2 focus:outline-brand-yellow/60 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Додати ${product.title} до кошика`}
        >
          {isAdding ? 'Додано!' : product.inStock ? 'В кошик' : 'Немає в наявності'}
        </button>
      </div>
    </div>
  )
}

export default function CatalogPreview() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-white mb-4">Популярні букети</h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Обирайте з наших найкращих композицій, створених з любов'ю для особливих моментів
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featuredProducts.slice(0, 2).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {/* Відео-карточка про магазин */}
        <div className="glass rounded-2xl overflow-hidden group relative">
          <div className="relative h-64">
            <video 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src="/video/hero.mp4" 
              autoPlay 
              muted 
              playsInline 
              loop
            >
              <source src="/video/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Контент поверх відео */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-sm text-white/90 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow animate-pulse" />
                  GURT Studio
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Сучасні та стильні букети
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Ми створюємо неповторні композиції з найкращих квітів, поєднуючи традиції флористики з сучасними трендами
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-brand-yellow/10 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-brand-yellow">⭐</span>
                  <span className="text-white font-medium">4.9</span>
                  <span className="text-white/60 text-sm">(200+ відгуків)</span>
                </div>
              </div>
              <Link 
                to="/about"
                className="text-brand-yellow hover:text-white transition text-sm font-medium"
              >
                Детальніше →
              </Link>
            </div>
          </div>
        </div>
        
        {featuredProducts.slice(2).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center">
        <Link 
          to="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-black transition focus:outline focus:outline-2 focus:outline-brand-yellow/60"
        >
          Переглянути весь каталог
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
