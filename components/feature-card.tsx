'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSingleColumn, setIsSingleColumn] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkLayout = () => {
      if (cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth
        const containerWidth = cardRef.current.parentElement?.offsetWidth || 0
        setIsSingleColumn(cardWidth === containerWidth)
      }
    }

    const handleScroll = () => {
      if (isSingleColumn && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const cardHeight = rect.height
        const threshold = (windowHeight - cardHeight) / 1.5  // Center the active zone

        const isInViewport = (
          rect.top >= -threshold &&
          rect.top <= threshold
        )
        
        setIsHovered(isInViewport)
      }
    }

    // Initial checks
    checkLayout()
    handleScroll()

    window.addEventListener('resize', checkLayout)
    window.addEventListener('scroll', handleScroll)
    
    const timeout = setTimeout(() => {
      checkLayout()
      handleScroll()
    }, 100)
    
    return () => {
      window.removeEventListener('resize', checkLayout)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [isSingleColumn])

  return (
    <Card 
      ref={cardRef}
      className="transition-all duration-300 hover:shadow-lg h-64 flex flex-col items-center justify-center text-center overflow-hidden relative md:w-64 w-full"
      onMouseEnter={() => !isSingleColumn && setIsHovered(true)}
      onMouseLeave={() => !isSingleColumn && setIsHovered(false)}
    >
      <CardHeader className="w-full h-full flex flex-col items-center justify-start relative px-8 pt-16">
        <div 
          className={`text-indigo-600 transition-all duration-300 ease-in-out mb-6 ${
            isHovered ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          }`}
        >
          {React.cloneElement(icon as React.ReactElement, { className: 'w-12 h-12' })}
        </div>
        <div className={`absolute inset-0 flex flex-col items-center justify-start transition-all duration-300 ease-in-out w-full pt-20 ${
          isHovered ? 'translate-y-0' : 'translate-y-1/4'
        }`}>
          <CardTitle className={`mb-2 transition-all duration-300 ease-in-out max-w-[90%]`}>
            {title}
          </CardTitle>
          <CardDescription 
            className={`transition-all duration-300 ease-in-out max-w-[90%] ${
              isHovered ? 'opacity-100 max-h-[200px]' : 'opacity-0 max-h-0'
            }`}
          >
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}
