import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import data from '../data/products.json'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const foundProduct = data.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
      // Автоматично вибираємо перший доступний розмір
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes.includes('M') ? 'M' : foundProduct.sizes[0])
      }
    }
  }, [id])

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl text-white mb-4">Товар не знайдено</h1>
        <Link to="/catalog" className="text-brand-yellow hover:underline">
          Повернутися до каталогу
        </Link>
      </div>
    )
  }

  const handleAddToCart = async () => {
    if (!product || !product.inStock) return
    
    setIsAdding(true)
    addToCart(product, selectedSize, quantity)
    
    // Feedback для користувача
    setTimeout(() => setIsAdding(false), 1000)
  }

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  return (
    <div className="container py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/60 hover:text-white transition mb-8"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Назад
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative">
          <div className="glass rounded-2xl overflow-hidden">
            <img 
              src={`${import.meta.env.BASE_URL}${product.img.replace(/^\//, '')}`} 
              alt={product.title}
              className="w-full h-96 md:h-[500px] object-cover"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-medium text-lg">Немає в наявності</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">
              {product.title}
            </h1>
            <p className="text-white/60 text-sm mb-4">
              Артикул: {product.sku}
            </p>
            <p className="text-white/80 leading-relaxed">
              {product.desc}
            </p>
          </div>

          {/* Price */}
          <div className="glass p-4 rounded-xl">
            <span className="text-brand-yellow font-bold text-2xl">
              {product.price} грн
            </span>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-white font-medium mb-3">Розмір:</h3>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedSize === size
                        ? 'bg-brand-yellow text-brand-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-white font-medium mb-3">Кількість:</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center"
              >
                -
              </button>
              <span className="text-white font-medium px-4">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`w-full py-4 px-6 font-semibold rounded-xl transition ${
              product.inStock && !isAdding
                ? 'bg-brand-yellow text-brand-black hover:opacity-90'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAdding ? 'Додаємо...' : !product.inStock ? 'Немає в наявності' : 'Додати в кошик'}
          </button>

          {/* Product Details */}
          <div className="glass p-4 rounded-xl space-y-2">
            <div className="flex justify-between">
              <span className="text-white/60">Категорія:</span>
              <span className="text-white capitalize">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Колір:</span>
              <span className="text-white capitalize">{product.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Наявність:</span>
              <span className={product.inStock ? 'text-green-400' : 'text-red-400'}>
                {product.inStock ? 'В наявності' : 'Немає в наявності'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-white mb-8">Схожі товари</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(relatedProduct => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="glass rounded-xl overflow-hidden group hover:scale-105 transition-transform"
              >
                <img 
                  src={`${import.meta.env.BASE_URL}${relatedProduct.img.replace(/^\//, '')}`} 
                  alt={relatedProduct.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 line-clamp-1">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-brand-yellow font-semibold">
                    {relatedProduct.price} грн
                  </p>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}
