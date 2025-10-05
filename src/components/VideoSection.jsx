import { useRef, useEffect, useState } from 'react'

export default function VideoSection() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const videoRefs = useRef([])

  const videos = [
    {
      src: `${import.meta.env.BASE_URL}video/hero.mp4`,
      title: 'Квіткові композиції',
      description: 'Подивіться, як наші флористи створюють справжні шедеври'
    },
    {
      src: `${import.meta.env.BASE_URL}video/hero.mp4`,
      title: 'Процес створення',
      description: 'Від ідеї до реалізації - кожен букет унікальний'
    },
    {
      src: `${import.meta.env.BASE_URL}video/hero.mp4`,
      title: 'Щасливі моменти',
      description: 'Квіти, які дарують радість і залишаються в пам’яті назавжди'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo(prev => (prev + 1) % videos.length)
    }, 8000) // Зміна відео кожні 8 секунд

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // При зміні відео перезапускаєм поточне
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideo) {
          video.currentTime = 0
          video.play().catch(console.error)
        } else {
          video.pause()
        }
      }
    })
  }, [currentVideo])

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Наша робота в дії
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Подивіться, як ми створюємо красу в Instagram Reels стилі
        </p>
      </div>

      {/* Основний відео контейнер */}
      <div className="relative overflow-hidden rounded-2xl aspect-[9/16] max-w-sm mx-auto bg-black">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentVideo ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              ref={el => videoRefs.current[index] = el}
              className="w-full h-full object-cover"
              src={video.src}
              muted
              playsInline
              loop
              preload={index === 0 ? 'auto' : 'metadata'}
              aria-label={video.title}
            >
              <source src={video.src} type="video/mp4" />
              Ваш браузер не підтримує відео.
            </video>

            {/* Оверлей з інформацією */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        ))}

        {/* Прогрес індикатори */}
        <div className="absolute top-4 left-4 right-4 flex gap-1">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index === currentVideo
                  ? 'bg-brand-yellow'
                  : index < currentVideo
                  ? 'bg-white/60'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Навігаційні кнопки */}
        <button
          onClick={() => setCurrentVideo(prev => (prev - 1 + videos.length) % videos.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Попереднє відео"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentVideo(prev => (prev + 1) % videos.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Наступне відео"
        >
          ›
        </button>
      </div>

      {/* Мініатюри для навігації */}
      <div className="flex justify-center gap-3 mt-8">
        {videos.map((video, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(index)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentVideo
                ? 'border-brand-yellow scale-110'
                : 'border-white/20 hover:border-white/40'
            }`}
            aria-label={`Перейти до відео: ${video.title}`}
          >
            <video
              className="w-full h-full object-cover"
              src={video.src}
              muted
              preload="metadata"
            />
          </button>
        ))}
      </div>

      {/* CTA кнопка */}
      <div className="text-center mt-12">
        <a
          href="https://t.me/gurt_flowers"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-yellow text-brand-black font-semibold hover:opacity-90 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>🌹</span>
          Подивитися більше в Instagram
        </a>
      </div>
    </section>
  )
}