import AccountTypeSelector from '@/components/account-type-selector'
import { AuthBackground } from '@/components/auth-background'

export default function SignUpPage() {
  return (
    <AuthBackground>
      <AccountTypeSelector />
    </AuthBackground>
  )
}

