
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import heroVideo from '../assets/hero.mp4'
import heroPoster from '../assets/hero-poster.webp'

export default function Hero(){
  const [mounted, setMounted] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="relative mx-auto max-w-6xl text-center overflow-hidden rounded-2xl min-h-[80vh]">
      {/* Video BG - Instagram Reels Style */}
      <div className="absolute inset-0 -z-10">
        {!videoError ? (
          <video
            className="w-full h-full object-cover"
            src={heroVideo}
            poster={heroPoster}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            onError={(e) => {
              console.error('Video load error:', e?.currentTarget?.src)
              setVideoError(true)
            }}
            onLoadedData={() => console.log('Video loaded successfully')}
            aria-label="Відео-фон з красивими квітами GURT"
          >
            <source src={heroVideo} type="video/mp4" />
            Ваш браузер не підтримує відео.
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{backgroundImage: `url(${heroPoster})`}}
            aria-label="Фон з красивими квітами GURT"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
      </div>

      <div className="px-6 py-20 md:py-32 relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow drop-shadow-glow animate-pulse" />
          GURT • Flower Studio
        </span>

        {/* Animated GURT text effect */}
        <div className="mt-8 mb-6">
          <h1 className={`gurt-text text-6xl md:text-8xl font-bold text-white transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            GURT
          </h1>
        </div>

        <h2 className="text-2xl md:text-4xl font-medium leading-tight text-white mb-2">
          Естетичні букети з <span className="text-brand-yellow drop-shadow-glow">вау-ефектом</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/90 text-lg">
          Живі квіти, авторські композиції, доставка день-у-день. Онлайн-каталог, безпечна оплата, прозора логістика.
        </p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Link to="/catalog" 
             className="px-6 py-3 rounded-2xl bg-brand-yellow text-brand-black font-semibold hover:opacity-90 hover:scale-105 transition-all focus:outline focus:outline-2 focus:outline-brand-yellow/60"
             aria-label="Переглянути каталог букетів GURT">Дивитися каталог</Link>
          <Link to="/payment-and-delivery" 
             className="px-6 py-3 rounded-2xl border border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all backdrop-blur-sm focus:outline focus:outline-2 focus:outline-brand-yellow/60"
             aria-label="Інформація про оплату та доставку">Оплата та доставка</Link>
        </div>
      </div>

    </header>
  );
}
