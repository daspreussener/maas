'use client'

export default function DealLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:mt-0 mt-16">
      {children}
    </div>
  )
} 