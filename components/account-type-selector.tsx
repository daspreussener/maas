'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Store, ShoppingBag } from 'lucide-react'
import { AuthBackground } from '@/components/auth-background'

export default function AccountTypeSelector() {
  const [selectedType, setSelectedType] = useState<'seller' | 'buyer' | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedType) {
      router.push(`/signup/method?type=${selectedType}`)
    }
  }

  return (
    <AuthBackground>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              maas
            </h1>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Choose your account type
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Button variant="link" onClick={() => router.push('/signin')} className="p-0">
                Sign in
              </Button>
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Card 
              className={`p-6 cursor-pointer transition-all bg-white/50 backdrop-blur-sm shadow-m ${
                selectedType === 'seller' ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedType('seller')}
            >
              <div className="flex items-center">
                <Store className="h-6 w-6 text-indigo-600 mr-3" />
                <div>
                  <h3 className="text-lg font-medium">Seller Account</h3>
                  <p className="text-sm text-gray-500">I want to sell my business</p>
                </div>
              </div>
            </Card>

            <Card 
              className={`p-6 cursor-pointer transition-all bg-white/50 backdrop-blur-sm shadow-m ${
                selectedType === 'buyer' ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedType('buyer')}
            >
              <div className="flex items-center">
                <ShoppingBag className="h-6 w-6 text-indigo-600 mr-3" />
                <div>
                  <h3 className="text-lg font-medium">Buyer Account</h3>
                  <p className="text-sm text-gray-500">I want to buy a business</p>
                </div>
              </div>
            </Card>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </AuthBackground>
  )
}

