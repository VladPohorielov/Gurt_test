import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import products from '../data/products.json'

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedColor, setSelectedColor] = useState('all')
  const { addToCart } = useContext(CartContext)

  const categories = ['all', 'bouquets', 'compositions', 'plants']
  const colors = ['all', 'pink', 'white', 'purple', 'yellow', 'mixed']

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
    const colorMatch = selectedColor === 'all' || product.color === selectedColor
    return categoryMatch && colorMatch
  })

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-4">Каталог</h1>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-white/80">Категорія:</span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedCategory === category
                    ? 'bg-brand-yellow text-brand-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category === 'all' ? 'Всі' : 
                 category === 'bouquets' ? 'Букети' :
                 category === 'compositions' ? 'Композиції' : 'Рослини'}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-white/80">Колір:</span>
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedColor === color
                    ? 'bg-brand-yellow text-brand-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {color === 'all' ? 'Всі' :
                 color === 'pink' ? 'Рожевий' :
                 color === 'white' ? 'Білий' :
                 color === 'purple' ? 'Фіолетовий' :
                 color === 'yellow' ? 'Жовтий' : 'Мікс'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="glass rounded-2xl overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                src={`${import.meta.env.BASE_URL}${product.img.replace(/^\//, '')}`} 
                alt={product.title}
                loading="lazy"
                width="400"
                height="256"
              />
            </Link>
            
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-white font-medium mb-2 hover:text-brand-yellow transition">
                  {product.title}
                </h3>
              </Link>
              
              <p className="text-brand-yellow font-semibold text-lg mb-3">
                {product.price} грн
              </p>
              
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-brand-yellow text-brand-black py-2 px-4 rounded-xl font-medium hover:opacity-90 transition focus:outline focus:outline-2 focus:outline-brand-yellow/60"
                aria-label={`Додати ${product.title} до кошика`}
              >
                В кошик
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/80 text-lg">
            За вашими фільтрами товарів не знайдено
          </p>
        </div>
      )}
    </section>
  )
}
