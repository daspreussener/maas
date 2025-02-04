'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState, useRef, useCallback } from "react"
import { useSwipeable } from 'react-swipeable'

const steps = [
  {
    title: "Create Your Profile",
    description: "Build a comprehensive profile of your business, including financial data, operations, and growth potential. Our AI assistant guides you through each step, ensuring you highlight key selling points.",
    icon: "📊",
  },
  {
    title: "Get Matched",
    description: "Our advanced algorithm analyzes your profile and matches you with potential buyers or sellers. Review detailed compatibility reports and express interest in promising opportunities.",
    icon: "🤝",
  },
  {
    title: "Initial Discussions",
    description: "Engage in preliminary talks through our secure messaging system. Discuss high-level details, ask questions, and gauge mutual interest before proceeding to more in-depth negotiations.",
    icon: "💬",
  },
  {
    title: "Sign NDA & Share CIM",
    description: "Use our AI-powered tool to generate and sign Non-Disclosure Agreements. Then, share your Confidential Information Memorandum (CIM) securely within our platform.",
    icon: "🔏",
  },
  {
    title: "Negotiate Terms",
    description: "Utilize our built-in negotiation tools to discuss and agree on key terms. Our AI assistant can provide market insights and suggest fair terms based on comparable deals.",
    icon: "⚖️",
  },
  {
    title: "Due Diligence",
    description: "Conduct thorough due diligence using our comprehensive checklist and document management system. Our AI helps identify potential red flags and areas needing clarification.",
    icon: "🔍",
  },
  {
    title: "Finalize Agreement",
    description: "Draft and review the final purchase agreement using our AI-assisted contract generation tool. Collaborate in real-time with legal advisors within our secure environment.",
    icon: "📝",
  },
  {
    title: "Close the Deal",
    description: "Execute the final documents and manage the transfer of assets through our secure transaction system. Our platform ensures all legal and financial requirements are met for a smooth closing.",
    icon: "🎉",
  },
]

export function StepCarousel() {
  const [currentStep, setCurrentStep] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const [isMobile, setIsMobile] = useState(false)
  const [manualInteraction, setManualInteraction] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  const updateVisibleCards = useCallback(() => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth
      if (width >= 1024) {
        setVisibleCards(3)
        setIsMobile(false)
      } else if (width >= 768) {
        setVisibleCards(2)
        setIsMobile(false)
      } else {
        setVisibleCards(1)
        setIsMobile(true)
      }
    }
  }, [])

  useEffect(() => {
    updateVisibleCards()
    const resizeObserver = new ResizeObserver(updateVisibleCards)
    if (carouselRef.current) {
      resizeObserver.observe(carouselRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [updateVisibleCards])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % (steps.length - visibleCards + 1))
  }, [visibleCards])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev - 1 + (steps.length - visibleCards + 1)) % (steps.length - visibleCards + 1))
  }, [visibleCards])

  const handleManualNavigation = useCallback((action: () => void) => {
    setManualInteraction(true)
    action()

    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current)
    }

    // Reset the timer after a brief pause
    setTimeout(() => {
      setManualInteraction(false)
    }, 5000) // 5-second pause after manual interaction
  }, [])

  useEffect(() => {
    if (!manualInteraction) {
      autoScrollTimerRef.current = setInterval(nextStep, 5000)
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }
    }
  }, [nextStep, manualInteraction, visibleCards])

  const handlers = useSwipeable({
    onSwipedLeft: () => handleManualNavigation(nextStep),
    onSwipedRight: () => handleManualNavigation(prevStep),
    trackMouse: true
  })

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 pt-12 pb-4" ref={carouselRef}>
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-atomic-md">
        Your M&A Journey: From Listing to Closing
      </h2>
      <div className="relative overflow-hidden" {...handlers}>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentStep * (100 / visibleCards)}%)` }}
        >
          {steps.map((step, index) => (
            <Card key={index} className={`flex-shrink-0 mx-2 h-[400px] ${
              visibleCards === 3 ? 'w-[calc(33.333%-1rem)]' :
              visibleCards === 2 ? 'w-[calc(50%-1rem)]' :
              'w-[calc(100%-1rem)]'
            }`}>
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="text-sm text-gray-500 mt-4">
                  Step {index + 1} of {steps.length}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {!isMobile && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={() => handleManualNavigation(prevStep)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={() => handleManualNavigation(nextStep)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
      <div className="flex justify-center mt-4">
        {Array.from({ length: steps.length - visibleCards + 1 }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-3 h-3 rounded-full mx-1 p-0 ${
              currentStep === index ? 'bg-primary' : 'bg-gray-300'
            }`}
            onClick={() => handleManualNavigation(() => setCurrentStep(index))}
          />
        ))}
      </div>
    </div>
  )
}

