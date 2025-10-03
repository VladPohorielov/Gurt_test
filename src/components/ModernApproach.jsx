export default function ModernApproach() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side - Instagram Reels Style Video */}
        <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="relative w-80 h-[480px] md:w-96 md:h-[540px] rounded-3xl overflow-hidden bg-black shadow-2xl">
            {/* Video Background */}
            <video 
              className="w-full h-full object-cover"
              src={`${import.meta.env.BASE_URL}video/hero.mp4`} 
              autoPlay 
              muted 
              playsInline 
              loop
              onError={(e) => console.error('Studio video load error:', e)}
              aria-label="Відео нашої квіткової студії в стилі Instagram Reels"
            >
              <source src={`${import.meta.env.BASE_URL}video/hero.mp4`} type="video/mp4" />
              Ваш браузер не підтримує відео.
            </video>
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
            
            {/* Live Studio Badge */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-2 border border-white/20">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              Live Studio
            </div>
            
            {/* Phone-style frame effect */}
            <div className="absolute inset-0 rounded-3xl border-2 border-white/10 pointer-events-none"></div>
            
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-yellow/20 to-white/10 rounded-3xl blur-xl -z-10"></div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="space-y-8 lg:pl-8 order-1 lg:order-2 text-center lg:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Сучасний підхід до{' '}
              <span className="text-brand-yellow">флористики</span>
            </h2>
            <p className="text-white/80 text-xl leading-relaxed">
              Ми поєднуємо традиційне мистецтво створення букетів з сучасними технологіями та трендами.
            </p>
          </div>

          <div className="space-y-6">
            {/* Online ordering */}
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-yellow rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Онлайн-замовлення</h3>
                <p className="text-white/70">
                  Зручний каталог, миттєве оформлення, безпечна оплата
                </p>
              </div>
            </div>

            {/* Fast delivery */}
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-yellow rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Швидка доставка</h3>
                <p className="text-white/70">
                  День-у-день по Одесі, 4 зручні локації
                </p>
              </div>
            </div>

            {/* Custom design */}
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-yellow rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Авторський дизайн</h3>
                <p className="text-white/70">
                  Унікальні композиції від досвідчених флористів
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="https://t.me/gurt_flowers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-yellow text-brand-black px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition-opacity"
            >
              <span>💬</span>
              Замовити консультацію
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}