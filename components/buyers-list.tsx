'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BuyerTimeline } from "./buyer-timeline"

const statusColors = {
  "NDA": "bg-green-100 text-green-800",
  "CIM": "bg-green-200 text-green-800",
  "Letter of Intent": "bg-green-300 text-green-800",
  "Due diligence": "bg-green-400 text-green-800",
  "Purchase agreement": "bg-green-500 text-green-800",
  "Deal completed": "bg-green-600 text-white"
}

const buyers = [
  {
    id: 1,
    name: "Helena",
    photo: "/placeholder.svg?height=64&width=64",
    matchPercentage: 99,
    description: "Helena Motors, led by industry veteran Helena, seeks mid-market automotive/aerospace firms in North America for acquisition. Passionate about innovation and growth, we're backed by solid capital to foster technology advancements and expand market presence efficiently.",
    status: "NDA"
  },
  {
    id: 2,
    name: "James",
    photo: "/placeholder.svg?height=64&width=64",
    matchPercentage: 95,
    description: "James & Co., a rising star in the tech industry, is looking to diversify its portfolio by acquiring promising startups in the AI and machine learning space. With a strong focus on innovation, they bring both financial resources and technical expertise to the table.",
    status: "CIM"
  },
  {
    id: 3,
    name: "Leaf Corp.",
    photo: "/placeholder.svg?height=64&width=64",
    matchPercentage: 97,
    description: "Leaf Corp., an eco-friendly conglomerate, is expanding its reach in the sustainable energy sector. They're seeking businesses with innovative green technologies to complement their existing portfolio and drive the transition to renewable energy sources.",
    status: "Letter of Intent"
  },
  {
    id: 4,
    name: "Maui Venture Partners",
    photo: "/placeholder.svg?height=64&width=64",
    matchPercentage: 95,
    description: "Maui Venture Partners, a boutique investment firm, specializes in acquiring and growing mid-sized businesses in the hospitality and tourism industry. They bring a wealth of experience in operational optimization and market expansion strategies.",
    status: "Due diligence"
  },
  {
    id: 5,
    name: "TechGrowth Inc.",
    photo: "/placeholder.svg?height=64&width=64",
    matchPercentage: 98,
    description: "TechGrowth Inc. is a forward-thinking tech conglomerate looking to expand its portfolio in the software and AI sectors. With a strong track record of successful acquisitions, they bring both capital and industry expertise to the table.",
    status: "Purchase agreement"
  },
  {
    id: 6,
    name: "Global Innovations Ltd.",
    photo: "/placeholder.svg?height=64&width=64",
    matchPercentage: 96,
    description: "Global Innovations Ltd. is an international player in the market for disruptive technologies. They're seeking to acquire businesses that align with their vision of shaping the future of various industries through cutting-edge solutions.",
    status: "Deal completed"
  }
]

export default function BuyersList() {
  const router = useRouter()

  const handleOpenDeal = useCallback((buyerId: number) => {
    router.push(`/deal/${buyerId}`)
  }, [router])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Potential Buyers</h1>
      <div className="space-y-4">
        {buyers.map((buyer) => (
          <Card key={buyer.id} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 bg-gray-200 flex items-center justify-center text-2xl">
                {buyer.name === "Helena" && "🏠"}
                {buyer.name === "James" && "🔨"}
                {buyer.name === "Leaf Corp." && "🍃"}
                {buyer.name === "Maui Venture Partners" && "🏝️"}
                {buyer.name === "TechGrowth Inc." && "💻"}
                {buyer.name === "Global Innovations Ltd." && "🌐"}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      {buyer.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {buyer.matchPercentage}% Match
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {buyer.description}
                </p>
                <BuyerTimeline currentStep={buyer.status} statusColors={statusColors}/>
                <div className="mt-4 flex justify-between items-center">
                  <Button 
                    variant="default" 
                    className="bg-black hover:bg-gray-800 text-white"
                    onClick={() => handleOpenDeal(buyer.id)}
                  >
                    Open Deal
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

