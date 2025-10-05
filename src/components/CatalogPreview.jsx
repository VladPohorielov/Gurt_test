import { Link } from 'react-router-dom'
import data from '../data/products.json'
import ProductCardNew from './ProductCardNew'
import Masonry from './bits/Masonry'
import FocusCards from '@/components/ui/aceternity-focus-cards'
import { FadeUp, ScaleIn } from './bits/ScrollAnimation'

// Показуємо більше товарів для кращого masonry ефекту
const featuredProducts = data.slice(0, 12)

// Створюємо масив для Masonry з різними висотами
const createMasonryItems = (products) => {
  const heights = [400, 600, 350, 500, 450, 380, 520, 320, 480, 420, 550, 360] // Більше різних висот
  
  return products.map((product, index) => ({
    id: product.id.toString(),
    img: `${import.meta.env.BASE_URL}img/${product.img.replace('/img/', '')}`,
    url: `/product/${product.id}`,
    height: heights[index % heights.length],
    product: product
  }))
}

// Створюємо спеціальний промо-блок з правильним layout 
function PromoVideoCard() {
  return (
    <article className="group relative h-full rounded-2xl border border-yellow-500/20 bg-zinc-950/85 shadow-[0_1px_0_rgba(255,255,255,0.04)] overflow-hidden flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden">
        <video 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={`${import.meta.env.BASE_URL}video/hero.mp4`} 
          autoPlay 
          muted 
          playsInline 
          loop
        >
          <source src={`${import.meta.env.BASE_URL}video/hero.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-amber-500 text-black text-xs font-semibold px-2 py-1 shadow">
            ★ GURT Studio
          </span>
        </div>
      </div>
      
      <div className="flex-1 px-5 pt-4 pb-3 flex flex-col">
        <h3 className="text-[15px] sm:text-base font-semibold text-white line-clamp-1">
          Сучасні та стильні букети
        </h3>
        
        <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
          Створюємо неповторні композиції з найкращих квітів, поєднуючи традиції флористики з сучасними трендами
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-amber-400">⭐</span>
            <span className="text-white font-medium">4.9</span>
            <span className="text-zinc-400 text-sm">(200+)</span>
          </div>
        </div>
        
        <div className="mt-auto pt-3">
          <Link
            to="/about"
            className="w-full rounded-xl bg-amber-500 text-black font-medium py-2.5 flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors"
          >
            Детальніше про нас
          </Link>
        </div>
      </div>
      
      {/* Декоративна жовта смуга */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[2px] from-amber-500/0 via-amber-400/60 to-amber-500/0 bg-gradient-to-b" />
    </article>
  )
}

export default function CatalogPreview() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-6">
      <FadeUp delay={0.2}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white mb-4">Популярні букети</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Обирайте з наших найкращих композицій, створених з любов'ю для особливих моментів
          </p>
        </div>
      </FadeUp>

      {/* Покращений грід з різними висотами */}
      <ScaleIn delay={0.4}>
        <div className="mb-12">
          <div className="masonry-grid">
          {featuredProducts.map((product, index) => {
            const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-68', 'h-84', 'h-76', 'h-88', 'h-60', 'h-92', 'h-70', 'h-78'];
            const heightClass = heights[index % heights.length];
            
            return (
              <div 
                key={product.id} 
                className={`masonry-item ${heightClass} group cursor-pointer`}
                onClick={() => window.location.href = `/product/${product.id}`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50">
                  <img
                    src={`${import.meta.env.BASE_URL}img/${product.img.replace('/img/', '')}`}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.title}</h3>
                    <p className="text-brand-yellow font-bold text-lg">{product.price} грн</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </ScaleIn>

      <FadeUp delay={0.6}>
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
      </FadeUp>
    </section>
  )
}
