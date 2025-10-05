
import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { FadeUp, FadeDown, ScaleIn } from './bits/ScrollAnimation'

// Ледачий імпорт Light Rays з резервним варіантом
const LightRays = lazy(() => import('@/components/bits/LightRays').catch(() => 
  import('@/components/bits/LightRaysFallback')
))

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      {/* Фон під контентом */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-zinc-900/40" />}>
          <LightRays 
            raysOrigin="top-center"
            raysColor="#FFD400"
            raysSpeed={1.2}
            lightSpread={0.8}
            rayLength={1.5}
            followMouse={true}
            mouseInfluence={0.08}
            noiseAmount={0.05}
            distortion={0.02}
            className="opacity-60"
          />
        </Suspense>
        {/* Легка віньєтка/димка для збирання фону, дуже делікатно */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.30)_100%)]" />
      </div>

      {/* Контент зверху */}
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 text-center">
        {/* Бейдж-лого/назва — завжди світлий текст */}
        <FadeDown delay={0.2}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="font-medium">GURT • Flower Studio</span>
          </div>
        </FadeDown>

        {/* Великий логотип GURT */}
        <ScaleIn delay={0.4} duration={1.2}>
          <div className="mt-8 mb-6">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-white drop-shadow-2xl">
              GURT
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-amber-400/20 blur-sm">
                GURT
              </span>
            </div>
          </div>
        </ScaleIn>

        <FadeUp delay={0.6}>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Квіти, що говорять замість слів
          </h2>
        </FadeUp>

        <FadeUp delay={0.8}>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto">
            Доставка по Одесі за 1–2 години. Естетичні букети з вау-ефектом.
          </p>
        </FadeUp>

        <FadeUp delay={1.0}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/catalog" className="rounded-xl bg-amber-500 text-black px-6 py-3 font-medium hover:bg-amber-400 transition-colors">
              Обрати букет
            </Link>
            <Link to="/contact" className="rounded-xl border border-white/15 text-white px-6 py-3 font-medium hover:bg-white/10 transition-colors">
              Зв'язатися
            </Link>
          </div>
        </FadeUp>
      </div>

    </section>
  );
}
