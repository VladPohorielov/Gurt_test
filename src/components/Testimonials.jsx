import { FadeUp } from './bits/ScrollAnimation'

const testimonials = [
  {
    id: 1,
    name: "Олена К.",
    text: "Неймовірно красиві букети! Доставили точно в час, квіти свіжі і пахнуть неймовірно. Чоловік в захваті!",
    rating: 5
  },
  {
    id: 2,
    name: "Марія П.",
    text: "Замовляла весільний букет. Флористи GURT створили справжній шедевр! Дякую за професіоналізм.",
    rating: 5
  },
  {
    id: 3,
    name: "Андрій С.",
    text: "Швидка доставка, чудова якість, адекватні ціни. Тепер замовляю тільки тут!",
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-6">
      <FadeUp delay={0.2}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white mb-4">Відгуки клієнтів</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Що кажуть наші клієнти про нашу роботу
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <FadeUp key={testimonial.id} delay={0.4 + index * 0.2}>
            <div className="glass p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-white/80 mb-4 italic">
                "{testimonial.text}"
              </p>
              
              <p className="text-brand-yellow font-semibold">
                {testimonial.name}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
