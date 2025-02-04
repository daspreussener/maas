import AuthForm from '@/components/auth-form'
import { AuthBackground } from '@/components/auth-background'

export default function SignInPage() {
  return (
    <AuthBackground>
      <AuthForm mode="signin" />
    </AuthBackground>
  )
}