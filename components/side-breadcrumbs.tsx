'use client'

import { ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"

interface Step {
  name: string;
  href: string;
  status: 'complete' | 'current' | 'upcoming';
}

interface SideBreadcrumbsProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  color?: 'blue' | 'indigo';
  isDealPage?: boolean;
  isMobileMenuOpen?: boolean;
}

export default function SideBreadcrumbs({ steps, currentStep, onStepClick, color = 'indigo', isDealPage = false, isMobileMenuOpen = false }: SideBreadcrumbsProps) {
  const colorClasses = {
    blue: {
      complete: 'text-blue-600 hover:bg-blue-100',
      current: 'bg-blue-600 text-white',
      completeBg: 'bg-blue-600 group-hover:bg-blue-800',
      border: 'border-blue-600',
      text: 'text-blue-600'
    },
    indigo: {
      complete: 'text-indigo-600 hover:bg-indigo-100',
      current: 'bg-indigo-600 text-white',
      completeBg: 'bg-indigo-600 group-hover:bg-indigo-800',
      border: 'border-indigo-600',
      text: 'text-indigo-600'
    }
  }[color]

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768) // 768px is the default breakpoint for md in Tailwind
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (isSmallScreen) {
    return (
      <nav className={`flex items-center space-x-2 overflow-x-auto py-4 px-4 bg-white fixed transition-all duration-200 ${
        isDealPage ? (isMobileMenuOpen ? 'top-[410px]' : 'top-[64px]') : 'top-0'
      } left-0 right-0 z-40`}>
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-center">
            {index > 0 && <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />}
            <button
              onClick={() => onStepClick(index)}
              className={cn(
                "px-2 py-1 text-sm font-medium rounded-md whitespace-nowrap",
                {
                  [colorClasses.complete]: step.status === 'complete',
                  [colorClasses.current]: step.status === 'current',
                  'text-gray-500 hover:bg-gray-100': step.status === 'upcoming'
                }
              )}
            >
              {step.name}
            </button>
          </div>
        ))}
      </nav>
    )
  }

  return (
    <nav aria-label="Progress" className="w-64 bg-white shadow-md p-4">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pb-10' : ''}`}>
            {stepIdx !== steps.length - 1 ? (
              <div className={cn("-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full", colorClasses.completeBg)} aria-hidden="true" />
            ) : null}
            <div className="relative flex items-start group">
              <span className="h-9 flex items-center" aria-hidden="true">
                <span
                  className={cn(
                    "relative z-10 w-8 h-8 flex items-center justify-center rounded-full",
                    {
                      [colorClasses.completeBg]: step.status === 'complete',
                      [`bg-white border-2 ${colorClasses.border}`]: step.status === 'current',
                      "bg-white border-2 border-gray-300 group-hover:border-gray-400": step.status === 'upcoming'
                    }
                  )}
                  onClick={() => onStepClick(stepIdx)}
                >
                  {step.status === 'complete' ? (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  ) : step.status === 'current' ? (
                    <span className={cn("h-2.5 w-2.5 rounded-full", colorClasses.completeBg)} />
                  ) : (
                    <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                  )}
                </span>
              </span>
              <span className="ml-4 min-w-0 flex flex-col cursor-pointer" onClick={() => onStepClick(stepIdx)}>
                <span className={colorClasses.text}>{step.name}</span>
                <span className="text-sm text-gray-500">{`Step ${stepIdx + 1} of ${steps.length}`}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

