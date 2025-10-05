import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

export default function AnimatedHeading({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.8,
  ease = 'power2.out',
  ...props 
}) {
  const headingRef = useRef(null)

  useEffect(() => {
    const element = headingRef.current
    if (!element) return

    // Split text into words and characters
    const words = element.textContent.split(' ')
    element.innerHTML = ''
    
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span')
      wordSpan.className = 'inline-block'
      wordSpan.style.overflow = 'hidden'
      
      const chars = word.split('')
      chars.forEach((char, charIndex) => {
        const charSpan = document.createElement('span')
        charSpan.textContent = char
        charSpan.className = 'inline-block'
        charSpan.style.transform = 'translateY(100%)'
        wordSpan.appendChild(charSpan)
      })
      
      // Add space after word (except last word)
      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement('span')
        spaceSpan.innerHTML = '&nbsp;'
        spaceSpan.className = 'inline-block'
        spaceSpan.style.transform = 'translateY(100%)'
        wordSpan.appendChild(spaceSpan)
      }
      
      element.appendChild(wordSpan)
    })

    // Animate characters
    const chars = element.querySelectorAll('span span')
    gsap.fromTo(chars, 
      { 
        y: '100%',
        opacity: 0 
      },
      {
        y: '0%',
        opacity: 1,
        duration,
        ease,
        delay,
        stagger: 0.02,
        force3D: true,
      }
    )
  }, [delay, duration, ease])

  return (
    <div
      ref={headingRef}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  )
}