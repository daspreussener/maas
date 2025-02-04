'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import SideBreadcrumbs from './side-breadcrumbs'

type Step = {
  name: string
  href: string
  status: 'current' | 'upcoming' | 'complete'
}

const initialSteps: Step[] = [
  { name: 'Basic Info', href: '#', status: 'current' },
  { name: 'Preferences', href: '#', status: 'upcoming' },
  { name: 'Business Experience', href: '#', status: 'upcoming' },
  { name: 'Deal Preferences', href: '#', status: 'upcoming' },
  { name: 'Budgets and Financials', href: '#', status: 'upcoming' },
  { name: 'Payment Information', href: '#', status: 'upcoming' },
]

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Singapore',
  'Other'
]

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]

const businessTypes = [
  'AI Apps and Tools',
  'Amazon',
  'App',
  'Browser Extension',
  'Content',
  'CRM ERP and Cloud Plugin',
  'Crypto App',
  'Domain',
  'Ecommerce',
  'Game',
  'Newsletter',
  'SaaS',
  'Services',
  'Shopify',
  'Shopify Plugin',
  'Social Media Account',
  'Transactional / Marketplace',
  'WordPress',
  'WordPress Plugin',
  'YouTube',
  'Other'
]

const industries = [
  'Automotive',
  'Business',
  'Design and Style',
  'Education',
  'Electronics',
  'Entertainment',
  'Food and Drink',
  'General Knowledge',
  'Health and Beauty',
  'Hobbies and Games',
  'Home and Garden',
  'Internet',
  'Lifestyle',
  'Sports and Outdoor',
  'Travel'
]

const businessCountOptions = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5+'
]

const sellerLocations = [
  'United States',
  'Europe',
  'Asia',
  'Australia',
  'Canada',
  'United Kingdom',
  'New Zealand',
  'Other'
]

export default function BuyerOnboardingForm() {
  const [step, setStep] = useState(0)
  const [steps, setSteps] = useState(initialSteps)
  const [formData, setFormData] = useState({
    companyName: '',
    country: 'United States',
    state: 'Alabama',
    phoneNumber: '',
    businessInterest: '',
    wouldInvest: '',
    isAccredited: '',
    businessCount: '',
    businessExperience: [] as string[],
    acquisitionDetails: '',
    interestedBusinessModels: [] as string[],
    preferredLocations: [] as string[],
    interestedIndustries: [] as string[],
    acquisitionBudget: '',
    dealSizeMin: '',
    dealSizeMax: '',
    requiresFinancing: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setStep(prev => {
      const newStep = prev + 1
      const updatedSteps = steps.map((s, i) => ({
        ...s,
        status: i === newStep ? 'current' as const : i < newStep ? 'complete' as const : 'upcoming' as const
      }))
      setSteps(updatedSteps)
      return newStep
    })
  }

  const handleBack = () => {
    setStep(prev => {
      const newStep = prev - 1
      const updatedSteps = steps.map((s, i) => ({
        ...s,
        status: i === newStep ? 'current' as const : i < newStep ? 'complete' as const : 'upcoming' as const
      }))
      setSteps(updatedSteps)
      return newStep
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      // Log the request details
      console.log('Making request to:', '/api/buyer')
      console.log('With headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      console.log('With body:', formData)

      const res = await fetch('/api/buyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      // Log the response details
      console.log('Response status:', res.status)
      console.log('Response headers:', res.headers)
      
      if (!res.ok) {
        const text = await res.text() // Get raw response text
        console.error('Error response:', text)
        throw new Error(`Server responded with ${res.status}: ${text}`)
      }

      const data = await res.json()
      router.push('/dashboard')
    } catch (error) {
      console.error('Full error:', error)
      alert(`Failed to submit form: ${error instanceof Error ? error.message : 'Unknown error occurred'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const navigateToStep = (stepIndex: number) => {
    setStep(stepIndex)
    const updatedSteps = steps.map((s, i) => ({
      ...s,
      status: i === stepIndex ? 'current' as const : i < stepIndex ? 'complete' as const : 'upcoming' as const
    }))
    setSteps(updatedSteps)
  }

  const toggleBusinessType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      businessExperience: prev.businessExperience.includes(type)
        ? prev.businessExperience.filter(t => t !== type)
        : [...prev.businessExperience, type]
    }))
  }

  const toggleBusinessModel = (type: string) => {
    setFormData(prev => ({
      ...prev,
      interestedBusinessModels: prev.interestedBusinessModels.includes(type)
        ? prev.interestedBusinessModels.filter(t => t !== type)
        : [...prev.interestedBusinessModels, type]
    }))
  }

  const toggleIndustry = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      interestedIndustries: prev.interestedIndustries.includes(industry)
        ? prev.interestedIndustries.filter(i => i !== industry)
        : [...prev.interestedIndustries, industry]
    }))
  }

  const handleLocationChange = (value: string) => {
    if (!formData.preferredLocations.includes(value)) {
      setFormData(prev => ({
        ...prev,
        preferredLocations: [...prev.preferredLocations, value]
      }))
    }
  }

  const removeLocation = (locationToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter(location => location !== locationToRemove)
    }))
  }

  return (
    <div className="flex flex-col md:flex-row">
      <SideBreadcrumbs steps={steps} currentStep={step} onStepClick={navigateToStep} />
      <div className="flex-1 max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:mt-0 mt-16">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Basic Info</h2>
                
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Optional"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Where are you located?</Label>
                  <Select
                    name="country"
                    value={formData.country}
                    onValueChange={(value) => handleSelectChange('country', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.country === 'United States' && (
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select
                      name="state"
                      value={formData.state}
                      onValueChange={(value) => handleSelectChange('state', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {usStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="phoneNumber">What is your phone number?</Label>
                  <div className="mt-1 flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      +1
                    </span>
                    <Input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Continue'}
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center text-gray-900">Preferences</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Firstly, why are you looking for an online business?</h3>
                  <RadioGroup
                    value={formData.businessInterest}
                    onValueChange={(value) => handleSelectChange('businessInterest', value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="portfolio" id="portfolio" />
                      <Label htmlFor="portfolio" className="flex-grow cursor-pointer">
                        I represent a company or fund and we are buying a portfolio of assets
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="side-hustle" id="side-hustle" />
                      <Label htmlFor="side-hustle" className="flex-grow cursor-pointer">
                        I'm looking for a side hustle and income generation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="full-time" id="full-time" />
                      <Label htmlFor="full-time" className="flex-grow cursor-pointer">
                        I'm looking for my next entrepreneurial venture, a full-time business
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none" className="flex-grow cursor-pointer">
                        None of the above
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Would you consider investing in businesses rather than buying?</h3>
                  <RadioGroup
                    value={formData.wouldInvest}
                    onValueChange={(value) => handleSelectChange('wouldInvest', value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="invest-yes" />
                      <Label htmlFor="invest-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="invest-no" />
                      <Label htmlFor="invest-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Are you an accredited investor?</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            An accredited investor meets specific income or net worth requirements as defined by securities regulations.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <RadioGroup
                    value={formData.isAccredited}
                    onValueChange={(value) => handleSelectChange('isAccredited', value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="accredited-yes" />
                      <Label htmlFor="accredited-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="accredited-no" />
                      <Label htmlFor="accredited-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Tell us more about your experience running an online business.
                  </h2>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    How many businesses do you currently own?
                  </h3>
                  <Select
                    value={formData.businessCount}
                    onValueChange={(value) => handleSelectChange('businessCount', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCountOptions.map((count) => (
                        <SelectItem key={count} value={count}>
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    What type of business do you have experience with?
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleBusinessType(type)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
                          ${formData.businessExperience.includes(type)
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      In as much detail as possible, what you are looking to acquire?
                    </h2>
                    <p className="text-gray-600">
                      Online businesses come in all shapes and sizes. Provide detail below, and we will use this detail to better match you with relevant assets.
                    </p>
                  </div>
                  <Textarea
                    name="acquisitionDetails"
                    value={formData.acquisitionDetails}
                    onChange={handleInputChange}
                    placeholder="e.g. We are a private company with interest in acquiring a profitable SaaS business with low churn and defensible technology in one of either the heath care sector or the medtech sector."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      What industries are you interested in?
                    </h2>
                    <p className="text-gray-600">Select all that apply</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        type="button"
                        onClick={() => toggleIndustry(industry)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
                          ${formData.interestedIndustries.includes(industry)
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      What business models are you interested in?
                    </h2>
                    <p className="text-gray-600">Select all that apply</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleBusinessModel(type)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
                          ${formData.interestedBusinessModels.includes(type)
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Do you have a preferred seller location?
                    </h2>
                  </div>
                  <div>
                    <Label>Seller Locations</Label>
                    <Select onValueChange={handleLocationChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select one or more locations" />
                      </SelectTrigger>
                      <SelectContent>
                        {sellerLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.preferredLocations.map((location) => (
                        <Badge
                          key={location}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeLocation(location)}
                        >
                          {location} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      What is your overall acquisition budget?
                    </h2>
                  </div>
                  <div>
                    <Label>Overall Budget</Label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <Input
                        type="text"
                        name="acquisitionBudget"
                        value={formData.acquisitionBudget}
                        onChange={handleInputChange}
                        className="pl-7"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      What is your preferred deal size?
                    </h2>
                  </div>
                  <div>
                    <Label>Deal Size Range</Label>
                    <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <Input
                          type="text"
                          name="dealSizeMin"
                          value={formData.dealSizeMin}
                          onChange={handleInputChange}
                          className="pl-7"
                          placeholder="Min"
                        />
                      </div>
                      <span className="text-center">-</span>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <Input
                          type="text"
                          name="dealSizeMax"
                          value={formData.dealSizeMax}
                          onChange={handleInputChange}
                          className="pl-7"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    For your preferred deal size, will you require financing?
                  </h3>
                  <RadioGroup
                    value={formData.requiresFinancing}
                    onValueChange={(value) => handleSelectChange('requiresFinancing', value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="financing-yes" />
                      <Label htmlFor="financing-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="financing-no" />
                      <Label htmlFor="financing-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center text-gray-900">Payment Information</h2>
                {/* Payment information form will go here */}
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Complete
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

