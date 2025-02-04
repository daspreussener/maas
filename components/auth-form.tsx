'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

declare global {
  interface Window {
    google: any;
  }
}

interface AuthFormProps {
  mode?: 'signin' | 'signup'
}

interface GoogleResponse {
  credential: string;
}

function AuthFormContent({ mode = 'signin' }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const accountTypeFromUrl = searchParams?.get('type')?.toUpperCase()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false,
    accountType: (accountTypeFromUrl === 'SELLER' ? 'SELLER' : 'BUYER') as 'BUYER' | 'SELLER'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'signin',
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        document.cookie = `token=${data.token}; path=/`
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Always go to dashboard on signin
        router.push('/dashboard')
      } else {
        setError(data.error || 'Sign in failed')
      }
    } catch (error) {
      console.error('Sign-in error:', error)
      setError('An error occurred during sign in')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      window.google.accounts.id.initialize({
        client_id: '739654463038-gm26s1a2571bbmca54ohbbbcm7pg69ue.apps.googleusercontent.com',
        callback: async (response: GoogleResponse) => {
          try {
            const res = await fetch('/api/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                mode: mode === 'signin' ? 'google-signin' : 'google-signup',
                googleToken: response.credential,
                accountType: searchParams?.get('type')?.toUpperCase() ?? 'BUYER',
              }),
            })

            if (!res.ok) {
              throw new Error('Authentication failed')
            }

            const data = await res.json()
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))

            // Different routing for signup vs signin
            if (mode === 'signup') {
              if (data.user.accountType === 'SELLER') {
                router.push('/onboarding')
              } else if (data.user.accountType === 'BUYER') {
                router.push('/buyer-onboarding')
              }
            } else {
              router.push('/dashboard')
            }
          } catch (error) {
            console.error('Google auth error:', error)
          }
        },
      })

      window.google.accounts.id.prompt()
    } catch (error) {
      console.error('Failed to load Google Identity Services:', error)
    }
  }

  const handleSuccess = (data: { user: any, token: string }) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/dashboard')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with mode:', mode === 'signin' ? 'signin' : 'signup')
    
    if (mode === 'signin') {
      await handleSignIn(e)
    } else {
      await handleSignUp(e)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log('Starting signup with data:', {
        mode: 'signup',
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        accountType: formData.accountType,
      })

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'signup',
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          accountType: formData.accountType,
        }),
      })

      const data = await res.json()
      console.log('Signup response:', data)

      if (res.ok) {
        document.cookie = `token=${data.token}; path=/`
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Route to onboarding based on account type
        if (data.user.accountType === 'SELLER') {
          router.push('/onboarding')
        } else {
          router.push('/buyer-onboarding')
        }
      } else {
        setError(data.error || 'Sign up failed')
      }
    } catch (error) {
      console.error('Sign-up error:', error)
      setError('An error occurred during sign up')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            maas
          </h1>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Sign in failed
                </h3>
                <div className="mt-1 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-m">
          {mode === 'signin' && (
            <>
              <Button
                onClick={handleGoogleSignIn}
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
                Sign in with Google
              </Button>

              <div className="relative my-6 flex items-center justify-center gap-4">
                <div className="w-full h-px bg-gray-300/50"></div>
                <span className="text-gray-500 text-[13px] flex-shrink-0">Or</span>
                <div className="w-full h-px bg-gray-300/50"></div>
              </div>
            </>
          )}

          <div className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {mode === 'signup' && (
                <ul className="mt-2 text-sm text-gray-500 space-y-1">
                  <li>• Mix of uppercase & lowercase letters</li>
                  <li>• Minimum 7 characters long</li>
                  <li>• Contain at least 1 number</li>
                </ul>
              )}
            </div>

            {mode === 'signup' && (
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                </div>
                <div className="ml-3">
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
              </div>
            )}

            <Button 
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isSubmitting || (mode === 'signup' && !formData.agreeToTerms)}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Please wait...' : (mode === 'signin' ? 'Sign in' : 'Sign up')}
            </Button>
          </div>
        </Card>

        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => router.push('/signup')} 
                className="p-0"
              >
                Create an account
              </Button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => router.push('/signin')} 
                className="p-0"
              >
                Sign in
              </Button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default function AuthForm({ mode = 'signin' }: AuthFormProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    }>
      <AuthFormContent mode={mode} />
    </Suspense>
  )
}

