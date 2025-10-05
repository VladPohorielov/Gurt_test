import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import ProductCardNew from '../components/ProductCardNew'
import FocusCards from '@/components/ui/aceternity-focus-cards'
import products from '../data/products.json'
import { FadeUp, ScaleIn } from '../components/bits/ScrollAnimation'

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedColor, setSelectedColor] = useState('all')
  const { addToCart } = useContext(CartContext)
  const { toast } = useToast()

  const categories = ['all', 'bouquets', 'compositions', 'plants']
  const colors = ['all', 'pink', 'white', 'purple', 'yellow', 'mixed']

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
    const colorMatch = selectedColor === 'all' || product.color === selectedColor
    return categoryMatch && colorMatch
  })

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <FadeUp delay={0.2}>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-6">Каталог</h1>
        
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 text-white">
            <TabsTrigger value="all" className="data-[state=active]:bg-brand-yellow data-[state=active]:text-brand-black">
              Всі
            </TabsTrigger>
            <TabsTrigger value="bouquets" className="data-[state=active]:bg-brand-yellow data-[state=active]:text-brand-black">
              Букети
            </TabsTrigger>
            <TabsTrigger value="compositions" className="data-[state=active]:bg-brand-yellow data-[state=active]:text-brand-black">
              Композиції
            </TabsTrigger>
            <TabsTrigger value="plants" className="data-[state=active]:bg-brand-yellow data-[state=active]:text-brand-black">
              Рослини
            </TabsTrigger>
          </TabsList>
          
          {/* Color filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-white/80 text-sm">Колір:</span>
            {colors.map(color => (
              <Badge
                key={color}
                variant={selectedColor === color ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  selectedColor === color
                    ? 'bg-brand-yellow text-brand-black hover:bg-brand-yellow/90'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color === 'all' ? 'Всі' :
                 color === 'pink' ? 'Рожевий' :
                 color === 'white' ? 'Білий' :
                 color === 'purple' ? 'Фіолетовий' :
                 color === 'yellow' ? 'Жовтий' : 'Мікс'}
              </Badge>
            ))}
          </div>
        </Tabs>
        </div>
      </FadeUp>

      {/* Грід з рівними висотами карток */}
      <ScaleIn delay={0.4}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
          {filteredProducts.map(product => (
            <ProductCardNew key={product.id} product={product} />
          ))}
        </div>
      </ScaleIn>

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
