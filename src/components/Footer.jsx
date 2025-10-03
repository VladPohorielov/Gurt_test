import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="mt-20 border-t border-white/10 bg-brand-black/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold text-brand-yellow mb-4 block">
              GURT
            </Link>
            <p className="text-white/60 mb-4">
              Студія любові та квітів. Створюємо букети з любов'ю.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Навігація</h3>
            <ul className="space-y-2">
              <li><Link to="/catalog" className="text-white/60 hover:text-white transition">Каталог</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-white transition">Про нас</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-white transition">Контакти</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2">
              <li><span className="text-white/60">Букети</span></li>
              <li><span className="text-white/60">Композиції</span></li>
              <li><span className="text-white/60">Рослини</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2">
              <li className="text-white/60">м. Одеса</li>
              <li className="text-white/60">Квіти по оптовим цінам</li>
              <li>
                <a href="tel:+380637027770" className="text-white/60 hover:text-brand-yellow transition">
                  +38 (063) 702-77-70
                </a>
              </li>
              <li>
                <a href="https://t.me/gurt_flowers" className="text-white/60 hover:text-brand-yellow transition">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hr my-8"></div>

        <div className="text-center">
          <p className="text-white/60">
             2024 GURT Flower Studio. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  )
}
