'use client'

import { Suspense } from 'react'
import SignupMethodSelector from '@/components/signup-method-selector'
import { AuthBackground } from '@/components/auth-background'

function SignupMethodContent() {
  return <SignupMethodSelector />
}

export default function SignupMethod() {
  return (
    <AuthBackground>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">Loading...</div>
          </div>
        }
      >
        <SignupMethodContent />
      </Suspense>
    </AuthBackground>
  )
}
