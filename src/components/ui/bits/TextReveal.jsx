import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function TextReveal({ 
  children, 
  className = '',
  triggerClassName = '',
  delay = 0,
  duration = 1,
  ease = 'power2.out',
  stagger = 0.05,
  ...props 
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split text into lines
    const text = container.textContent
    const textWords = text.split(' ')
    
    container.innerHTML = ''
    
    textWords.forEach((word, index) => {
      const wordSpan = document.createElement('span')
      wordSpan.className = 'inline-block mr-2 overflow-hidden'
      
      const innerSpan = document.createElement('span')
      innerSpan.textContent = word
      innerSpan.className = 'inline-block'
      innerSpan.style.transform = 'translateY(100%)'
      
      wordSpan.appendChild(innerSpan)
      container.appendChild(wordSpan)
    })

    // Animate on scroll
    const animatedWords = container.querySelectorAll('span span')
    
    gsap.fromTo(animatedWords, 
      { 
        y: '100%',
        opacity: 0 
      },
      {
        y: '0%',
        opacity: 1,
        duration,
        ease,
        stagger,
        delay,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      }
    )
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [delay, duration, ease, stagger])

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', className, triggerClassName)}
      {...props}
    >
      {children}
    </div>
  )
}