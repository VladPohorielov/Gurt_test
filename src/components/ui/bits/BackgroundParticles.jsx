import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

export default function BackgroundParticles({ 
  className = '',
  particleCount = 20,
  color = '#FFD400',
  opacity = 0.3,
  size = { min: 2, max: 8 },
  speed = { min: 10, max: 30 },
  ...props 
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full pointer-events-none'
      particle.style.background = color
      particle.style.opacity = Math.random() * opacity
      
      const particleSize = Math.random() * (size.max - size.min) + size.min
      particle.style.width = `${particleSize}px`
      particle.style.height = `${particleSize}px`
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // Animate particles
    particles.forEach((particle, index) => {
      const duration = Math.random() * (speed.max - speed.min) + speed.min
      const direction = Math.random() * 360
      
      gsap.to(particle, {
        x: `+=${Math.cos(direction) * 200}`,
        y: `+=${Math.sin(direction) * 200}`,
        duration,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
      })
      
      // Fade in/out animation
      gsap.to(particle, {
        opacity: Math.random() * opacity,
        duration: Math.random() * 3 + 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
      })
    })

    return () => {
      particles.forEach(particle => {
        gsap.killTweensOf(particle)
        particle.remove()
      })
    }
  }, [particleCount, color, opacity, size.min, size.max, speed.min, speed.max])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      {...props}
    />
  )
}