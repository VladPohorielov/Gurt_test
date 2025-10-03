export default function CTA() {
  return (
    <section className="mx-auto mt-20 max-w-4xl px-6">
      <div className="glass p-12 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Готові створити незабутній момент?
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Напишіть нам в Telegram для консультації або індивідуального замовлення. Ми відповімо протягом 15 хвилин!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://t.me/gurt_flowers"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-yellow text-brand-black font-semibold hover:opacity-90 transition focus:outline focus:outline-2 focus:outline-brand-yellow/60"
            aria-label="Написати в Telegram GURT"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Написати в Telegram
          </a>
          
          <a 
            href="tel:+380637027770"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-white/60"
            aria-label="Подзвонити GURT"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Подзвонити
          </a>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-white/60 text-sm">
            📍 Одеса, 4 магазини • 🕰️ Пн-Нд: 9:00-21:00 • � Квіти по оптовим цінам
          </p>
        </div>
      </div>
    </section>
  )
}
