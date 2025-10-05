import { useLocation, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function OrderSuccess() {
  const location = useLocation()
  const { orderNumber, formData } = location.state || {}

  if (!orderNumber) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="text-2xl text-white mb-4">Помилка</h1>
        <Button asChild variant="outline">
          <Link to="/">Повернутися на головну</Link>
        </Button>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        
        <h1 className="text-3xl font-semibold text-white mb-4">
          Замовлення оформлено!
        </h1>
        
        <Badge variant="secondary" className="text-lg px-4 py-2 bg-brand-yellow text-brand-black font-bold">
          #{orderNumber}
        </Badge>
      </div>

      <Card className="bg-white/5 border-white/10 text-white mb-8">
        <CardHeader>
          <CardTitle className="text-white">Деталі замовлення</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">Ваше замовлення прийнято в обробку</p>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button asChild className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90">
          <Link to="/catalog">Продовжити покупки</Link>
        </Button>
      </div>
    </section>
  )
}
