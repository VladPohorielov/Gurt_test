export default function PaymentDelivery() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-white mb-8">Оплата і доставка</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-brand-yellow mb-6">Доставка</h2>
          
          <div className="space-y-6">
            <div className="glass p-6">
              <h3 className="text-white font-semibold mb-3"> Доставка по Одесі</h3>
              <p className="text-white/80 mb-2">Вартість: 150 грн</p>
              <p className="text-white/80">Час доставки: 2-4 години</p>
            </div>
            
            <div className="glass p-6">
              <h3 className="text-white font-semibold mb-3"> Експрес доставка</h3>
              <p className="text-white/80 mb-2">Вартість: 300 грн</p>
              <p className="text-white/80">Час доставки: 1-2 години</p>
            </div>
            
            <div className="glass p-6">
              <h3 className="text-white font-semibold mb-3"> Самовивіз</h3>
              <p className="text-white/80 mb-2">Безкоштовно</p>
              <div className="text-white/80 space-y-3">
                <div>
                  <strong>Адреси в Одесі:</strong><br/>
                  • вул. Михайла Комарова, 10 (через АЗК ОККО)<br/>
                  • просп. Шевченка, 19/21<br/>
                  • вул. Академіка Корольова, 43Е<br/>
                  • Чубаївська, 1, ЖК «Ітака»
                </div>
                <div>
                  <strong>Телефон:</strong> +380637027770<br/>
                  <strong>Графік роботи:</strong> Пн-Нд: 9:00 - 21:00
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-brand-yellow mb-6">Оплата</h2>
          
          <div className="space-y-6">
            <div className="glass p-6">
              <h3 className="text-white font-semibold mb-3"> Картою онлайн</h3>
              <p className="text-white/80">
                Visa, MasterCard, Приват24, monobank
              </p>
            </div>
            
            <div className="glass p-6">
              <h3 className="text-white font-semibold mb-3"> Готівкою при доставці</h3>
              <p className="text-white/80">
                Оплата кур\'єру готівкою або карткою
              </p>
            </div>
            
            <div className="glass p-6">
              <h3 className="text-white font-semibold mb-3"> При самовивозі</h3>
              <p className="text-white/80">
                Готівка або картка в нашому магазині
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 glass p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Важлива інформація</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-brand-yellow font-semibold mb-3"> Час оформлення</h3>
            <p className="text-white/80 mb-4">
              Замовлення приймаються цілодобово. Доставка здійснюється з 9:00 до 21:00.
            </p>
            
            <h3 className="text-brand-yellow font-semibold mb-3"> Свіжість гарантована</h3>
            <p className="text-white/80">
              Всі квіти свіжі та високої якості. Гарантуємо збереження свіжості протягом 5-7 днів.
            </p>
          </div>
          
          <div>
            <h3 className="text-brand-yellow font-semibold mb-3"> Підтвердження замовлення</h3>
            <p className="text-white/80 mb-4">
              Після оформлення замовлення ми зв\'яжемося з вами для підтвердження протягом 30 хвилин.
            </p>
            
            <h3 className="text-brand-yellow font-semibold mb-3"> Заміна квітів</h3>
            <p className="text-white/80">
              Якщо деяких квітів немає в наявності, ми можемо замінити їх на аналогічні за якістю та ціною.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
