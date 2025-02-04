'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'
import { AuthBackground } from '@/components/auth-background'

interface GoogleResponse {
  credential: string;
}

interface PromptMomentNotification {
  isDisplayed(): boolean;
  isNotDisplayed(): boolean;
  isSkippedMoment(): boolean;
  isDismissedMoment(): boolean;
  getNotDisplayedReason(): string;
  getSkippedReason(): string;
  getDismissedReason(): string;
}

function SignupMethodSelectorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const accountType = searchParams?.get('type')

  const handleGoogleSignup = async () => {
    try {
      window.google.accounts.id.initialize({
        client_id: '739654463038-gm26s1a2571bbmca54ohbbbcm7pg69ue.apps.googleusercontent.com',
        auto_select: false,
        cancel_on_tap_outside: true,
        callback: async (response: GoogleResponse) => {
          try {
            const res = await fetch('/api/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                mode: 'google',
                googleToken: response.credential,
                accountType: accountType?.toUpperCase() ?? 'BUYER',
              }),
            })

            if (!res.ok) {
              const error = await res.json()
              console.error('Server error:', error)
              throw new Error(error.error || 'Authentication failed')
            }

            const user = await res.json()
            console.log('Google signup successful:', user)
            router.push(accountType === 'seller' ? '/onboarding' : '/buyer-onboarding')
          } catch (error) {
            console.error('Google signup error:', error)
          }
        },
      })

      window.google.accounts.id.prompt((notification: PromptMomentNotification) => {
        if (notification.isNotDisplayed()) {
          console.error('Google sign-in prompt not displayed:', notification.getNotDisplayedReason())
        }
        if (notification.isSkippedMoment()) {
          console.error('Google sign-in prompt skipped:', notification.getSkippedReason())
        }
        if (notification.isDismissedMoment()) {
          console.error('Google sign-in prompt dismissed:', notification.getDismissedReason())
        }
      })
    } catch (error) {
      console.error('Failed to load Google Identity Services:', error)
    }
  }

  const handleEmailSignup = () => {
    router.push(`/signup/form?type=${accountType}`)
  }

  if (!accountType) {
    router.push('/signup')
    return null
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            maas
          </h1>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose how you want to create your account
          </p>
        </div>

        <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-m">
          <Button
            onClick={handleGoogleSignup}
            className="w-full mb-4 bg-white/20 text-gray-700 border border-gray-300 hover:bg-white/50"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </Button>

          <div className="relative my-6 flex items-center justify-center gap-4">
            <div className="w-full h-px bg-gray-300/50"></div>
            <span className="text-gray-500 text-[13px] flex-shrink-0">Or</span>
            <div className="w-full h-px bg-gray-300/50"></div>
          </div>

          <Button
            onClick={handleEmailSignup}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Sign up with email <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default function SignupMethodSelector() {
  return (
    <AuthBackground>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">Loading...</div>
          </div>
        }
      >
        <SignupMethodSelectorContent />
      </Suspense>
    </AuthBackground>
  )
}

