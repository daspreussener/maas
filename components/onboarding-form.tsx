'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import SideBreadcrumbs from './side-breadcrumbs'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from 'lucide-react'

type StepStatus = 'current' | 'upcoming' | 'complete';
interface Step {
  name: string;
  href: string;
  status: StepStatus;
}

const initialSteps: Step[] = [
  { name: 'Welcome', href: '#', status: 'current' },
  { name: 'Business Basics', href: '#', status: 'upcoming' },
  { name: 'Show Me the Money', href: '#', status: 'upcoming' },
  { name: 'Leadership Style', href: '#', status: 'upcoming' },
  { name: 'Risk Tolerance', href: '#', status: 'upcoming' },
  { name: 'Vision for the Business', href: '#', status: 'upcoming' },
  { name: 'Negotiation and Collaboration Style', href: '#', status: 'upcoming' },
  { name: 'Deal Process Preferences', href: '#', status: 'upcoming' },
  { name: 'Business Photos', href: '#', status: 'upcoming' },
  { name: 'Payment Information', href: '#', status: 'upcoming' },
] as const;

export default function OnboardingForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    businessDescription: '',
    industry: '',
    operationLocation: '',
    ownership: '',
    lastYearRevenue: '',
    nextYearRevenue: '',
    currentMargins: '',
    nextYearMargins: '',
    leadershipStyle: '',
    riskTolerance: '',
    vision: '',
    negotiationStyle: '',
    dealProcessPreference: '',
    paymentProcessor: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    selectedPlan: ''
  })
  const [photos, setPhotos] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [steps, setSteps] = useState(initialSteps)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file))
      setPhotos(prev => [...prev, ...newPhotos])
    }
  }, [])

  const isPaymentStep = (stepNumber: number) => stepNumber === steps.length - 1
  const isSecondToLastStep = (stepNumber: number) => stepNumber === steps.length - 2

  const handleNext = () => {
    if (step >= steps.length - 1) return // Prevent going beyond last step
    
    setStep(prev => {
      const newStep = prev + 1
      const updatedSteps = steps.map((s, i) => ({
        ...s,
        status: (i === newStep ? 'current' : i < newStep ? 'complete' : 'upcoming') as StepStatus
      }))
      setSteps(updatedSteps)
      return newStep
    })
  }

  const handlePrevious = () => {
    setStep(prev => {
      const newStep = prev - 1
      const updatedSteps = steps.map((s, i) => ({
        ...s,
        status: (i === newStep ? 'current' : i < newStep ? 'complete' : 'upcoming') as StepStatus
      }))
      setSteps(updatedSteps)
      return newStep
    })
  }

  const navigateToStep = (stepIndex: number) => {
    setStep(stepIndex)
    const updatedSteps = steps.map((s, i) => ({
      ...s,
      status: (i === stepIndex ? 'current' : i < stepIndex ? 'complete' : 'upcoming') as StepStatus
    }))
    setSteps(updatedSteps)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          businessDescription: formData.businessDescription,
          industry: formData.industry,
          operationLocation: formData.operationLocation,
          lastYearRevenue: formData.lastYearRevenue,
          nextYearRevenue: formData.nextYearRevenue,
          leadershipStyle: formData.leadershipStyle,
          riskTolerance: formData.riskTolerance,
          vision: formData.vision,
          negotiationStyle: formData.negotiationStyle,
          dealProcessPreference: formData.dealProcessPreference,
          photos: photos
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create seller profile')
      }

      router.push('/dashboard')
    } catch (error) {
      console.error('Error:', error)
      alert(`Failed to submit form: ${error instanceof Error ? error.message : 'Unknown error occurred'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <SideBreadcrumbs steps={steps} currentStep={step} onStepClick={navigateToStep} />
      <div className={`flex-1 ${
        isPaymentStep(step) ? 'p-6 max-w-4xl' : 'max-w-3xl'
      } mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:mt-0 mt-16`}>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-8">
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Welcome to the Onboarding Process</h2>
                <p className="text-center text-gray-600">
                  We're excited to help you find the ideal buyer for your business. This onboarding process will guide you through a series of questions to help us understand your business, your goals, and what you're looking for in a potential buyer.
                </p>
                <p className="text-center text-gray-600">
                  You'll be answering questions about:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Your business basics and financials</li>
                  <li>Photos of your business</li>
                  <li>Your preferred payment processor</li>
                  <li>Your leadership and management style</li>
                  <li>Your risk tolerance and vision for the future</li>
                  <li>Your negotiation and collaboration preferences</li>
                  <li>Your deal process preferences</li>
                </ul>
                <p className="text-center text-gray-600">
                  Don't worry if you don't have all the answers right away. You can always save your progress and come back later. Let's get started!
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Business Basics</h2>
                <div>
                  <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700">
                    Please provide a detailed description of your business
                  </label>
                  <textarea
                    id="businessDescription"
                    name="businessDescription"
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Describe your business, its history, and its unique value proposition..."
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    In which industry does your business primarily operate?
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={formData.industry}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="services">Professional Services</option>
                    <option value="hospitality">Hospitality & Tourism</option>
                    <option value="education">Education</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="operationLocation" className="block text-sm font-medium text-gray-700">
                    What is the primary geographical scope of your business operations?
                  </label>
                  <select
                    id="operationLocation"
                    name="operationLocation"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={formData.operationLocation}
                    onChange={handleInputChange}
                  >
                    <option value="">Select operational scope</option>
                    <option value="local">Local (Single city or metropolitan area)</option>
                    <option value="regional">Regional (Multiple cities or states)</option>
                    <option value="national">National (Across the entire country)</option>
                    <option value="international">International (Operating in multiple countries)</option>
                    <option value="global">Global (Worldwide presence and operations)</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Show Me the Money</h2>
                <div>
                  <label htmlFor="lastYearRevenue" className="block text-sm font-medium text-gray-700">
                    What was your business's total revenue for the last fiscal year?
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      name="lastYearRevenue"
                      id="lastYearRevenue"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      value={formData.lastYearRevenue}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="nextYearRevenue" className="block text-sm font-medium text-gray-700">
                    What is your projected revenue for the next fiscal year?
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      name="nextYearRevenue"
                      id="nextYearRevenue"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      value={formData.nextYearRevenue}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Leadership Style</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select the statement that best describes your preferred leadership style for the new owner:
                  </label>
                  <div className="space-y-4">
                    {[
                      { id: 'active', label: 'I want the new owner to be actively involved in day-to-day business operations.' },
                      { id: 'delegative', label: 'I prefer that the new owner be hands-on with leadership and delegate responsibilities to the existing management team.' },
                      { id: 'collaborative', label: 'I value a collaborative decision-making approach from the buyer.' },
                      { id: 'inclusive', label: 'I would like the buyer to consider employee input when making decisions.' }
                    ].map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="leadershipStyle"
                          type="radio"
                          value={option.id}
                          checked={formData.leadershipStyle === option.id}
                          onChange={handleInputChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Risk Tolerance</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select the statement that best describes your risk tolerance preferences for the buyer:
                  </label>
                  <div className="space-y-4">
                    {[
                      { id: 'stability', label: 'The buyer should focus on maintaining financial stability rather than aggressive growth.' },
                      { id: 'calculated', label: 'I am open to the buyer taking calculated risks to expand the business.' },
                      { id: 'familiar', label: 'I believe the buyer should stick to industries or markets they are familiar with.' }
                    ].map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="riskTolerance"
                          type="radio"
                          value={option.id}
                          checked={formData.riskTolerance === option.id}
                          onChange={handleInputChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Vision for the Business</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select the statement that best describes your vision for the business:
                  </label>
                  <div className="space-y-4">
                    {[
                      { id: 'values', label: 'It is important that the buyer respects and upholds the values of the business.' },
                      { id: 'legacy', label: 'I prefer the buyer prioritizing preserving the seller\'s legacy over making immediate operational changes.' },
                      { id: 'noChanges', label: 'I prefer that the buyer does not make immediate operational changes after acquisition.' },
                      { id: 'longTerm', label: 'I would like the buyer to treat the business as a long-term investment.' }
                    ].map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="vision"
                          type="radio"
                          value={option.id}
                          checked={formData.vision === option.id}
                          onChange={handleInputChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Negotiation and Collaboration Style</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select the statement that best describes your negotiation and collaboration preferences:
                  </label>
                  <div className="space-y-4">
                    {[
                      { id: 'mutual', label: 'I prefer that negotiations focus on finding a mutually beneficial outcome.' },
                      { id: 'walkAway', label: 'I am comfortable stepping away if the buyer\'s vision doesn\'t align with mine.' },
                      { id: 'flexible', label: 'I value flexibility during negotiations for minor deal points.' },
                      { id: 'feedback', label: 'I believe the buyer should consider my feedback during the early stages of ownership.' }
                    ].map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="negotiationStyle"
                          type="radio"
                          value={option.id}
                          checked={formData.negotiationStyle === option.id}
                          onChange={handleInputChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Deal Process Preferences</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select the statement that best describes your deal process preferences:
                  </label>
                  <div className="space-y-4">
                    {[
                      { id: 'efficient', label: 'I prefer buyers who conduct due diligence efficiently and transparently.' },
                      { id: 'flexible', label: 'I value flexibility in the timeline if it leads to a better outcome.' },
                      { id: 'upfront', label: 'I prefer deals where all potential challenges are disclosed upfront.' }
                    ].map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="dealProcessPreference"
                          type="radio"
                          value={option.id}
                          checked={formData.dealProcessPreference === option.id}
                          onChange={handleInputChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Business Photos</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload photos of your business
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                  />
                </div>
                {photos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Uploaded Photos</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative h-24 bg-gray-100 rounded-md overflow-hidden">
                          <Image
                            src={photo}
                            alt={`Uploaded photo ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 9 && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-900">Choose Your Plan</h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {[
                    { name: 'basic', price: '$99', features: ["Basic business listing", "Email support", "Up to 5 photos"] },
                    { name: 'pro', price: '$199', features: ["All Basic features", "Priority listing", "Phone support", "Up to 20 photos"] },
                    { name: 'enterprise', price: 'Custom', features: ["All Pro features", "Custom solutions", "Dedicated account manager", "Unlimited photos"] },
                  ].map((plan) => (
                    <Card 
                      key={plan.name}
                      className={`p-6 w-full sm:w-60 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                        formData.selectedPlan === plan.name ? 'ring-2 ring-indigo-500' : ''
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.name }))}
                    >
                      <div>
                        <h3 className="text-xl font-semibold mb-2 flex justify-between items-center">
                          {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)} Plan
                          {formData.selectedPlan === plan.name && <Check className="text-indigo-500" />}
                        </h3>
                        <p className="text-3xl font-bold mb-4">{plan.price}<span className="text-sm font-normal">/month</span></p>
                        <ul className="text-sm space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cardCVC"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            {step > 0 && (
              <Button
                type="button"
                onClick={handlePrevious}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Previous
              </Button>
            )}
            {isPaymentStep(step) ? (
              <form onSubmit={handleSubmit}>
                <Button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

