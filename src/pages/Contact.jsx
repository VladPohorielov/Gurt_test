import SimpleMap from "../components/SimpleMap";
import ScrollReveal from '../components/bits/ScrollReveal';
import { FadeUp, FadeLeft, FadeRight } from '../components/bits/ScrollAnimation';

export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <ScrollReveal
        baseOpacity={0.1}
        enableBlur={true}
        baseRotation={3}
        blurStrength={8}
        containerClassName="mb-8"
        textClassName="text-3xl font-semibold text-white"
      >
        Контакти
      </ScrollReveal>
      
      <ScrollReveal
        baseOpacity={0.2}
        enableBlur={true}
        baseRotation={1}
        blurStrength={4}
        containerClassName="mb-12"
        textClassName="text-lg text-center"
      >
        Ми завжди готові допомогти вам створити ідеальний букет для будь-якої події
      </ScrollReveal>
      
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Основні контакти */}
        <FadeLeft delay={0.4}>
          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-brand-yellow mb-4">
              Зв'яжіться з нами
            </h2>
          
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-brand-yellow">📞</span>
                <div>
                  <p className="text-white font-medium">Телефон</p>
                  <a href="tel:+380637027770" className="text-white/80 hover:text-brand-yellow transition">
                    +38 (063) 702-77-70
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-brand-yellow">💬</span>
                <div>
                  <p className="text-white font-medium">Telegram</p>
                  <a href="https://t.me/gurt_flowers" className="text-white/80 hover:text-brand-yellow transition">
                    @gurt_flowers
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-brand-yellow">🕒</span>
                <div>
                  <p className="text-white font-medium">Графік роботи</p>
                  <p className="text-white/80">
                    Пн-Нд: 9:00 - 21:00
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-brand-yellow">💰</span>
                <div>
                  <p className="text-white font-medium">Особливість</p>
                  <p className="text-white/80">
                    Квіти по оптовим цінам
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeLeft>
        
        {/* Адреси магазинів */}
        <FadeUp delay={0.6}>
          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-brand-yellow mb-4">
              Наші магазини в Одесі
            </h2>
          
            <div className="space-y-4">
              <div>
                <p className="text-white font-medium mb-1">📍 Центральний</p>
                <p className="text-white/80 text-sm">пр. Шевченко 19/21</p>
              </div>
              
              <div>
                <p className="text-white font-medium mb-1">📍 Комарова</p>
                <p className="text-white/80 text-sm">Михайла Комарова 10 (через АЗК ОККО)</p>
              </div>
              
              <div>
                <p className="text-white font-medium mb-1">📍 Корольова</p>
                <p className="text-white/80 text-sm">Академіка Корольова 43Е</p>
              </div>
              
              <div>
                <p className="text-white font-medium mb-1">📍 ЖК Ітака</p>
                <p className="text-white/80 text-sm">Чубаївська 1, ЖК Ітака</p>
              </div>
            </div>
          </div>
        </FadeUp>
        
        {/* Швидке замовлення */}
        <FadeRight delay={0.8}>
          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Швидке замовлення
            </h2>
            <p className="text-white/80 mb-6">
              Зателефонуйте або напишіть в Telegram для швидкого оформлення замовлення.
            </p>
            
            <div className="space-y-3">
              <a 
                href="tel:+380637027770"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-black py-3 px-6 rounded-2xl font-medium hover:opacity-90 transition focus:outline focus:outline-2 focus:outline-brand-yellow/60"
                aria-label="Зателефонувати"
              >
                📞 Зателефонувати
              </a>
              
              <a 
                href="https://t.me/gurt_flowers"
                className="w-full inline-flex items-center justify-center gap-2 border border-brand-yellow text-brand-yellow py-3 px-6 rounded-2xl font-medium hover:bg-brand-yellow hover:text-brand-black transition focus:outline focus:outline-2 focus:outline-brand-yellow/60"
                aria-label="Написати в Telegram"
              >
                💬 Написати в Telegram
              </a>
            </div>
          </div>
        </FadeRight>
      </div>
      
      {/* Наші магазини */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Нас легко знайти</h2>
        <p className="text-white/80 mb-6">
          4 зручні локації в Одесі. Квіти по оптовим цінам в кожному магазині.
        </p>
        <SimpleMap />
      </div>
    </section>
  )
}