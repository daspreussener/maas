import { Suspense } from 'react'
import AuthForm from '@/components/auth-form'
import { AuthBackground } from '@/components/auth-background'

function SignupFormContent() {
  return <AuthForm mode="signup" />
}

export default function SignUpFormPage() {
  return (
    <AuthBackground>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">Loading...</div>
          </div>
        }
      >
        <SignupFormContent />
      </Suspense>
    </AuthBackground>
  )
}


