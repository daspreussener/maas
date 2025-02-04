'use client'

import { useState } from 'react'
import SideBreadcrumbs from './side-breadcrumbs'
import NDADocument from './nda-document'
import AICIMGenerator from '@/components/ai-cim-generator'
import DummyCIM from './dummy-cim'
import DueDiligence from './due-diligence'
import { useLayout } from '@/contexts/layout-context'

type Step = {
  name: string
  href: string
  status: 'current' | 'upcoming' | 'complete'
}

const initialSteps: Step[] = [
  { name: 'Sign NDA', href: '#', status: 'complete' },
  { name: 'Generate CIM', href: '#', status: 'complete' },
  { name: 'Sign Letter of Intent', href: '#', status: 'complete' },
  { name: 'Prepare Due Diligence', href: '#', status: 'current' },
  { name: 'Sign Purchase Agreement', href: '#', status: 'upcoming' },
  { name: 'Deal Completed', href: '#', status: 'upcoming' },
]

export default function DealProcess() {
  const [step, setStep] = useState(3)
  const [steps, setSteps] = useState(initialSteps)
  const { isMobileMenuOpen } = useLayout()

  const navigateToStep = (stepIndex: number) => {
    setStep(stepIndex)
    const updatedSteps = steps.map((s, i) => ({
      ...s,
      status: i === stepIndex ? 'current' as const : i < stepIndex ? 'complete' as const : 'upcoming' as const
    }))
    setSteps(updatedSteps)
  }

  return (
    <div className="flex">
      <SideBreadcrumbs 
        steps={steps} 
        currentStep={step} 
        onStepClick={navigateToStep}
        color="blue"
        isDealPage={true}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex-1 p-6">
        {step === 0 && <NDADocument />}
        {step === 1 && (
          <div className="space-y-6">
            <AICIMGenerator />
            <DummyCIM />
          </div>
        )}
        {step === 2 && <div>Letter of Intent Component (to be implemented)</div>}
        {step === 3 && <DueDiligence />}
        {step === 4 && <div>Purchase Agreement Component (to be implemented)</div>}
        {step === 5 && <div>Deal Completed Component (to be implemented)</div>}
      </div>
    </div>
  )
}

