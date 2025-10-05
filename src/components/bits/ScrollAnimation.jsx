import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function ScrollAnimation({ 
  children, 
  animation = 'fadeUp',
  duration = 1,
  delay = 0,
  trigger = 'bottom 80%',
  className = ''
}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Reset initial state
    gsap.set(element, {
      opacity: 0,
      y: animation === 'fadeUp' ? 60 : animation === 'fadeDown' ? -60 : 0,
      x: animation === 'fadeLeft' ? 60 : animation === 'fadeRight' ? -60 : 0,
      scale: animation === 'scale' ? 0.8 : 1,
      rotation: animation === 'rotate' ? 15 : 0,
    })

    // Create scroll trigger animation
    ScrollTrigger.create({
      trigger: element,
      start: `top ${trigger}`,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
          duration: duration,
          delay: delay,
          ease: 'power2.out'
        })
      },
      onLeaveBack: () => {
        gsap.to(element, {
          opacity: 0,
          y: animation === 'fadeUp' ? 60 : animation === 'fadeDown' ? -60 : 0,
          x: animation === 'fadeLeft' ? 60 : animation === 'fadeRight' ? -60 : 0,
          scale: animation === 'scale' ? 0.8 : 1,
          rotation: animation === 'rotate' ? 15 : 0,
          duration: duration * 0.5,
          ease: 'power2.out'
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [animation, duration, delay, trigger])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Specific animation components for convenience
export function FadeUp({ children, ...props }) {
  return <ScrollAnimation animation="fadeUp" {...props}>{children}</ScrollAnimation>
}

export function FadeDown({ children, ...props }) {
  return <ScrollAnimation animation="fadeDown" {...props}>{children}</ScrollAnimation>
}

export function FadeLeft({ children, ...props }) {
  return <ScrollAnimation animation="fadeLeft" {...props}>{children}</ScrollAnimation>
}

export function FadeRight({ children, ...props }) {
  return <ScrollAnimation animation="fadeRight" {...props}>{children}</ScrollAnimation>
}

export function ScaleIn({ children, ...props }) {
  return <ScrollAnimation animation="scale" {...props}>{children}</ScrollAnimation>
}

export function RotateIn({ children, ...props }) {
  return <ScrollAnimation animation="rotate" {...props}>{children}</ScrollAnimation>
}