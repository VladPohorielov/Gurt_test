import { useLocation, Link } from 'react-router-dom'

export default function OrderSuccess() {
  const location = useLocation()
  const { orderNumber, formData } = location.state || {}

  if (!orderNumber) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="text-2xl text-white mb-4">Помилка</h1>
        <Link to="/" className="text-brand-yellow hover:underline">
          Повернутися на головну
        </Link>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
          <span className="text-4xl"></span>
        </div>
        
        <h1 className="text-3xl font-semibold text-white mb-4">
          Замовлення оформлено!
        </h1>
        
        <p className="text-xl text-white/80 mb-2">
          Номер вашого замовлення:
        </p>
        
        <p className="text-2xl font-bold text-brand-yellow mb-8">
          #{orderNumber}
        </p>
      </div>

      <div className="glass p-8 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Деталі замовлення</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-brand-yellow font-semibold mb-3">Контактні дані</h3>
            <div className="space-y-2 text-white/80">
              <p><span className="text-white">Ім\'я:</span> {formData?.name}</p>
              <p><span className="text-white">Телефон:</span> {formData?.phone}</p>
              <p><span className="text-white">Email:</span> {formData?.email}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-brand-yellow font-semibold mb-3">Доставка</h3>
            <div className="space-y-2 text-white/80">
              <p><span className="text-white">Тип:</span> {
                formData?.deliveryType === 'delivery' ? 'Доставка по Одесі' :
                formData?.deliveryType === 'express' ? 'Експрес доставка' : 'Самовивіз'
              }</p>
              {formData?.address && (
                <p><span className="text-white">Адреса:</span> {formData.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-8 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Що далі?</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-brand-yellow font-bold text-lg">1.</span>
            <div>
              <p className="text-white font-medium">Підтвердження замовлення</p>
              <p className="text-white/80">
                Ми зв\'яжемося з вами протягом 30 хвилин для підтвердження замовлення
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-brand-yellow font-bold text-lg">2.</span>
            <div>
              <p className="text-white font-medium">Підготовка букету</p>
              <p className="text-white/80">
                Наші флористи створять ваш букет з найсвіжіших квітів
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-brand-yellow font-bold text-lg">3.</span>
            <div>
              <p className="text-white font-medium">Доставка</p>
              <p className="text-white/80">
                {formData?.deliveryType === 'pickup' 
                  ? 'Ви можете забрати замовлення в нашому магазині'
                  : 'Кур\'єр доставить замовлення за вказаною адресою'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-white/80">
          Питання? Пишіть нам в Telegram
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://t.me/gurt_flowers"
            className="inline-flex items-center gap-2 bg-brand-yellow text-brand-black py-3 px-6 rounded-2xl font-medium hover:opacity-90 transition focus:outline focus:outline-2 focus:outline-brand-yellow/60"
          >
             Написати в Telegram
          </a>
          
          <Link 
            to="/catalog"
            className="inline-flex items-center gap-2 border border-white/20 text-white py-3 px-6 rounded-2xl font-medium hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-white/60"
          >
            Продовжити покупки
          </Link>
        </div>
      </div>
    </section>
  )
}
