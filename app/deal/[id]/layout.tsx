import DealLayout from '@/components/deal-layout'

export default function DealPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DealLayout>{children}</DealLayout>
} 