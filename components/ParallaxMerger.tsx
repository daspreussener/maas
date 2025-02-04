'use client'

import { useEffect, useState } from 'react'

interface Circle {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

const predefinedCircles: Circle[] = [
  { id: 1, x: 10, y: 10, radius: 15, opacity: 0.2 },
  { id: 2, x: 30, y: 30, radius: 10, opacity: 0.15 },
  { id: 3, x: 50, y: 15, radius: 20, opacity: 0.25 },
  { id: 4, x: 70, y: 40, radius: 12, opacity: 0.18 },
  { id: 5, x: 90, y: 20, radius: 18, opacity: 0.22 },
  { id: 6, x: 15, y: 60, radius: 14, opacity: 0.17 },
  { id: 7, x: 35, y: 75, radius: 16, opacity: 0.2 },
  { id: 8, x: 55, y: 55, radius: 22, opacity: 0.23 },
  { id: 9, x: 75, y: 70, radius: 13, opacity: 0.16 },
  { id: 10, x: 85, y: 85, radius: 19, opacity: 0.21 },
]

const ParallaxMerger = () => {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const calculatePosition = (circle: Circle) => {
    if (!mounted) return circle.y
    
    const speed = circle.radius / 50
    const newY = circle.y + (scrollY * speed) / 10
    return newY
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.4)" />
          </linearGradient>
        </defs>
        
        {predefinedCircles.map((circle) => (
          <circle
            key={circle.id}
            cx={circle.x}
            cy={calculatePosition(circle)}
            r={circle.radius}
            fill="url(#circleGradient)"
            opacity={circle.opacity}
          />
        ))}
      </svg>
    </div>
  )
}

export default ParallaxMerger