'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from 'lucide-react'

const buyers = [
  {
    id: 1,
    name: 'V.C',
    photo: '/placeholder.svg?height=80&width=80',
    role: 'Acquisition Manager',
    country: 'Malaysia',
    memberSince: 'October 2023',
    experience: [
      'Led 5+ successful acquisitions in the e-commerce sector',
      '10 years of experience in brand building and scaling',
      'Expertise in cross-border M&A transactions'
    ],
    preferredDealSize: '$2M to $10M',
    acquisitionBudget: '$20M',
    about: 'We are an e-commerce aggregator and brand builder. With our in-house team comprised of marketers, builders and product innovators, we\'re focused on building best in class brands...',
    buyerType: 'Actively Acquiring E-commerce Brands. We look for brands with Profitability (200k+ SDE...',
    interests: ['Ecommerce']
  },
  {
    id: 2,
    name: 'M.R',
    photo: '/placeholder.svg?height=80&width=80',
    role: 'Investment Director',
    country: 'Singapore',
    memberSince: 'November 2023',
    experience: [
      'Extensive experience in investing in digital-first brands',
      'Proven track record of scaling businesses across Southeast Asia',
      'Deep understanding of the D2C market'
    ],
    preferredDealSize: '$5M to $15M',
    acquisitionBudget: '$30M',
    about: 'Leading investment firm specializing in digital-first brands and technology companies. Our team brings extensive experience in scaling businesses across Southeast Asia...',
    buyerType: 'Seeking high-growth D2C brands with strong market presence and scalable operations...',
    interests: ['D2C', 'Technology']
  },
  {
    id: 3,
    name: 'A.K',
    photo: '/placeholder.svg?height=80&width=80',
    role: 'Managing Partner',
    country: 'United States',
    memberSince: 'September 2023',
    experience: [
      'Successfully acquired and scaled multiple digital businesses',
      'Expertise in SaaS, content, and marketplace businesses',
      'Strong network of industry contacts'
    ],
    preferredDealSize: '$1M to $8M',
    acquisitionBudget: '$15M',
    about: 'Boutique investment firm focused on acquiring and growing digital businesses. We specialize in content, SaaS, and marketplace businesses...',
    buyerType: 'Looking for profitable digital businesses with stable revenue and growth potential...',
    interests: ['SaaS', 'Digital Content', 'Marketplaces']
  }
]

export default function Dashboard() {
  const [expandedAbout, setExpandedAbout] = useState<number | null>(null)
  const [expandedCriteria, setExpandedCriteria] = useState<number | null>(null)

  const toggleAbout = (id: number) => {
    setExpandedAbout(expandedAbout === id ? null : id)
  }

  const toggleCriteria = (id: number) => {
    setExpandedCriteria(expandedCriteria === id ? null : id)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Best Buyer Matches</h1>
      <div className="space-y-6">
        {buyers.map((buyer) => (
          <Card key={buyer.id} className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section - Profile Info */}
              <div className="flex flex-col items-start space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={buyer.photo} alt={buyer.name} />
                    <AvatarFallback>{buyer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{buyer.name}</h2>
                    <p className="text-gray-600">{buyer.role}</p>
                    <div className="flex items-center gap-1 text-gray-600">
                      <span className="text-xs">🌍</span>
                      <span>{buyer.country}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Member since {buyer.memberSince}</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  + Add Buyer
                </Button>
              </div>

              {/* Middle Section - Experience & Details */}
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Relevant Experience</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {buyer.experience.map((exp, index) => (
                      <li key={index}>{exp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">About the buyer</h3>
                  <div className="relative">
                    <p className={`text-gray-600 text-sm ${expandedAbout === buyer.id ? '' : 'line-clamp-2'}`}>
                      {buyer.about}
                    </p>
                    <button
                      onClick={() => toggleAbout(buyer.id)}
                      className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-1"
                    >
                      {expandedAbout === buyer.id ? 'Show less' : 'See more'}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedAbout === buyer.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section - Criteria */}
              <div className="lg:w-1/3 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Preferred deal size</h3>
                    <p className="text-lg font-semibold">{buyer.preferredDealSize}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Acquisition budget</h3>
                    <p className="text-lg font-semibold">{buyer.acquisitionBudget}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Buyer Type & Asset Criteria</h3>
                  <div className="relative">
                    <p className={`text-gray-600 text-sm ${expandedCriteria === buyer.id ? '' : 'line-clamp-2'}`}>
                      {buyer.buyerType}
                    </p>
                    <button
                      onClick={() => toggleCriteria(buyer.id)}
                      className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-1"
                    >
                      {expandedCriteria === buyer.id ? 'Show less' : 'See more'}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedCriteria === buyer.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Interested in</h3>
                  <div className="flex flex-wrap gap-2">
                    {buyer.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

