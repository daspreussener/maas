'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { FileUploader } from "./file-uploader"

export default function BusinessProfileForm() {
  const [formData, setFormData] = useState({
    businessDescription: '',
    industry: '',
    operationLocation: '',
    lastYearRevenue: '',
    nextYearRevenue: '',
    leadershipStyle: '',
    riskTolerance: '',
    vision: '',
    negotiationStyle: '',
    dealProcessPreference: '',
  })
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    // In a real application, you would fetch the user's data here
    // For now, we'll simulate it with some dummy data
    setFormData({
      businessDescription: 'Our company specializes in AI-powered software solutions...',
      industry: 'technology',
      operationLocation: 'national',
      lastYearRevenue: '1000000',
      nextYearRevenue: '1500000',
      leadershipStyle: 'collaborative',
      riskTolerance: 'calculated',
      vision: 'longTerm',
      negotiationStyle: 'mutual',
      dealProcessPreference: 'efficient',
    })
    setPhotos(['/placeholder.svg?height=100&width=100'])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (file: File) => {
    const newPhotoUrl = URL.createObjectURL(file)
    setPhotos(prev => [...prev, newPhotoUrl])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the updated data to your backend here
    console.log('Updated form data:', formData)
    console.log('Updated photos:', photos)
    alert('Profile updated successfully!')
  }

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Business Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="businessDescription">Business Description</Label>
          <Textarea
            id="businessDescription"
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="retail">Retail</option>
            <option value="manufacturing">Manufacturing</option>
          </select>
        </div>

        <div>
          <Label htmlFor="operationLocation">Operation Location</Label>
          <select
            id="operationLocation"
            name="operationLocation"
            value={formData.operationLocation}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="local">Local</option>
            <option value="regional">Regional</option>
            <option value="national">National</option>
            <option value="international">International</option>
          </select>
        </div>

        <div>
          <Label htmlFor="lastYearRevenue">Last Year's Revenue</Label>
          <Input
            type="number"
            id="lastYearRevenue"
            name="lastYearRevenue"
            value={formData.lastYearRevenue}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="nextYearRevenue">Projected Next Year's Revenue</Label>
          <Input
            type="number"
            id="nextYearRevenue"
            name="nextYearRevenue"
            value={formData.nextYearRevenue}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="leadershipStyle">Preferred Leadership Style</Label>
          <select
            id="leadershipStyle"
            name="leadershipStyle"
            value={formData.leadershipStyle}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="active">I want the new owner to be actively involved in day-to-day business operations.</option>
            <option value="delegative">I prefer that the new owner be hands-on with leadership and delegate responsibilities to the existing management team.</option>
            <option value="collaborative">I value a collaborative decision-making approach from the buyer.</option>
            <option value="inclusive">I would like the buyer to consider employee input when making decisions.</option>
          </select>
        </div>

        <div>
          <Label htmlFor="riskTolerance">Risk Tolerance</Label>
          <select
            id="riskTolerance"
            name="riskTolerance"
            value={formData.riskTolerance}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="stability">The buyer should focus on maintaining financial stability rather than aggressive growth.</option>
            <option value="calculated">I am open to the buyer taking calculated risks to expand the business.</option>
            <option value="familiar">I believe the buyer should stick to industries or markets they are familiar with.</option>
          </select>
        </div>

        <div>
          <Label htmlFor="vision">Vision for the Business</Label>
          <select
            id="vision"
            name="vision"
            value={formData.vision}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="values">It is important that the buyer respects and upholds the values of the business.</option>
            <option value="legacy">I prefer the buyer prioritizing preserving the seller's legacy over making immediate operational changes.</option>
            <option value="noChanges">I prefer that the buyer does not make immediate operational changes after acquisition.</option>
            <option value="longTerm">I would like the buyer to treat the business as a long-term investment.</option>
          </select>
        </div>

        <div>
          <Label htmlFor="negotiationStyle">Negotiation and Collaboration Style</Label>
          <select
            id="negotiationStyle"
            name="negotiationStyle"
            value={formData.negotiationStyle}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="mutual">I prefer that negotiations focus on finding a mutually beneficial outcome.</option>
            <option value="walkAway">I am comfortable stepping away if the buyer's vision doesn't align with mine.</option>
            <option value="flexible">I value flexibility during negotiations for minor deal points.</option>
            <option value="feedback">I believe the buyer should consider my feedback during the early stages of ownership.</option>
          </select>
        </div>

        <div>
          <Label htmlFor="dealProcessPreference">Deal Process Preferences</Label>
          <select
            id="dealProcessPreference"
            name="dealProcessPreference"
            value={formData.dealProcessPreference}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="efficient">I prefer buyers who conduct due diligence efficiently and transparently.</option>
            <option value="flexible">I value flexibility in the timeline if it leads to a better outcome.</option>
            <option value="upfront">I prefer deals where all potential challenges are disclosed upfront.</option>
          </select>
        </div>

        <div>
          <Label>Business Photos</Label>
          <div className="mt-2 grid grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Business photo ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
            ))}
          </div>
          <FileUploader
            onFileSelect={handlePhotoUpload}
            acceptedFileTypes="image/*"
          />
        </div>

        <Button type="submit" className="w-full">Update Profile</Button>
      </form>
    </Card>
  )
}

