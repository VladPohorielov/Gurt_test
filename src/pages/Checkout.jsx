import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryType: 'delivery',
    paymentMethod: 'card',
    comment: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Введіть ім\'я'
    if (!formData.phone.trim()) newErrors.phone = 'Введіть телефон'
    if (!formData.email.trim()) newErrors.email = 'Введіть email'
    if (formData.deliveryType === 'delivery' && !formData.address.trim()) {
      newErrors.address = 'Введіть адресу доставки'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const orderNumber = Math.floor(Math.random() * 1000000)
      clearCart()
      navigate('/order-success', { state: { orderNumber, formData } })
    } catch (error) {
      console.error('Order error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="text-2xl text-white mb-4">Ваш кошик порожній</h1>
        <a href="/catalog" className="text-brand-yellow hover:underline">
          Перейти до каталогу
        </a>
      </div>
    )
  }

  const deliveryPrice = formData.deliveryType === 'express' ? 300 : 
                       formData.deliveryType === 'delivery' ? 150 : 0
  const totalPrice = getTotalPrice() + deliveryPrice

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <h1 className="text-3xl font-semibold text-white mb-8">Оформлення замовлення</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Контактні дані</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Ім\'я *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-brand-yellow focus:outline-none"
                  placeholder="Ваше ім\'я"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-white mb-2">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-brand-yellow focus:outline-none"
                  placeholder="+380..."
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-brand-yellow focus:outline-none"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Доставка</h2>
            
            <div className="space-y-3 mb-4">
              {[
                { value: 'delivery', label: 'Доставка по Одесі', price: '150 грн' },
                { value: 'express', label: 'Експрес доставка', price: '300 грн' },
                { value: 'pickup', label: 'Самовивіз', price: 'Безкоштовно' }
              ].map(option => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryType"
                    value={option.value}
                    checked={formData.deliveryType === option.value}
                    onChange={handleInputChange}
                    className="text-brand-yellow focus:ring-brand-yellow"
                  />
                  <span className="text-white">{option.label}</span>
                  <span className="text-brand-yellow ml-auto">{option.price}</span>
                </label>
              ))}
            </div>
            
            {formData.deliveryType !== 'pickup' && (
              <div>
                <label className="block text-white mb-2">Адреса доставки *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-brand-yellow focus:outline-none"
                  placeholder="Вулиця, дім, квартира"
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
              </div>
            )}
          </div>

          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Спосіб оплати</h2>
            
            <div className="space-y-3">
              {[
                { value: 'card', label: 'Картою онлайн' },
                { value: 'cash', label: 'Готівкою при доставці' },
                { value: 'terminal', label: 'Карткою при доставці' }
              ].map(option => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={formData.paymentMethod === option.value}
                    onChange={handleInputChange}
                    className="text-brand-yellow focus:ring-brand-yellow"
                  />
                  <span className="text-white">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="glass p-6">
            <label className="block text-white mb-2">Коментар до замовлення</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-brand-yellow focus:outline-none resize-none"
              placeholder="Особливі побажання до замовлення..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-yellow text-brand-black py-4 px-6 rounded-2xl font-semibold hover:opacity-90 transition focus:outline focus:outline-2 focus:outline-brand-yellow/60 disabled:opacity-50"
          >
            {isLoading ? 'Оформлення...' : `Оформити замовлення (${totalPrice} грн)`}
          </button>
        </form>

        <div className="glass p-6 h-fit">
          <h2 className="text-xl font-semibold text-white mb-4">Ваше замовлення</h2>
          
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-white">{item.title}</p>
                  {item.size && <p className="text-white/60 text-sm">Розмір: {item.size}</p>}
                  <p className="text-white/60 text-sm">Кількість: {item.quantity}</p>
                </div>
                <p className="text-brand-yellow font-semibold">
                  {item.price * item.quantity} грн
                </p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/20 pt-4 space-y-2">
            <div className="flex justify-between text-white">
              <span>Товари:</span>
              <span>{getTotalPrice()} грн</span>
            </div>
            
            <div className="flex justify-between text-white">
              <span>Доставка:</span>
              <span>{deliveryPrice} грн</span>
            </div>
            
            <div className="flex justify-between text-xl font-semibold text-brand-yellow pt-2 border-t border-white/20">
              <span>До сплати:</span>
              <span>{totalPrice} грн</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
