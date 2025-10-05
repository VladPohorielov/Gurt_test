import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'

export default function ProductCardNew({ product, className = "" }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) return
    
    setIsAdding(true)
    const defaultSize = product.sizes && product.sizes.length > 0 ? (product.sizes.includes('M') ? 'M' : product.sizes[0]) : ''
    
    try {
      addToCart(product, defaultSize, 1)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
    
    setTimeout(() => setIsAdding(false), 1000)
  }

  const imageSrc = imageError 
    ? `${import.meta.env.BASE_URL}img/hero-poster.webp` 
    : `${import.meta.env.BASE_URL}${product.img.replace(/^\//, '')}`

  // Перевіряємо чи це преміум товар (ціна > 800 грн)
  const isPremium = product.price > 800
  
  return (
    <article
      className={`group relative h-full rounded-2xl border border-yellow-500/20 bg-zinc-950/85
                 shadow-[0_1px_0_rgba(255,255,255,0.04)] overflow-hidden
                 flex flex-col ${className}`}
    >
      {/* IMAGE BLOCK */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={imageSrc}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImageError(true)}
        />

        {/* Premium badge — у лівому верхньому куті всередині зображення */}
        {isPremium && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 text-black text-xs font-semibold px-2 py-1 shadow">
            ★ Premium
          </span>
        )}

        {/* Немає в наявності — центрований оверлей, НЕ займає місце нижче */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] grid place-items-center">
            <span className="rounded-full bg-red-600 text-white text-sm font-semibold px-3 py-1">
              Немає в наявності
            </span>
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="flex-1 px-5 pt-4 pb-3 flex flex-col">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-[15px] sm:text-base font-semibold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
          {product.desc || product.description}
        </p>

        {/* Ціна + розмір/чіпи */}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-2xl font-extrabold text-amber-400">
            {product.price} грн
          </div>
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-1">
              {product.sizes.slice(0, 2).map(size => (
                <span key={size} className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/10 text-xs text-zinc-300 px-2">
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA завжди прилипає до низу, але не вилазить — завдяки mt-auto */}
        <div className="mt-auto pt-3">
          <button
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="w-full rounded-xl bg-amber-500 text-black font-medium py-2.5 flex items-center justify-center gap-2
                       hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            {isAdding ? 'Додано!' : 'Додати в кошик'}
          </button>
        </div>
      </div>

      {/* Декоративна жовта «світлова» смуга по правому краю (тонко) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[2px] from-amber-500/0 via-amber-400/60 to-amber-500/0 bg-gradient-to-b" />
    </article>
  )
}