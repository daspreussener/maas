import ParallaxMerger from '@/components/ParallaxMerger'

export function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Base vertical gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-blue-300" />
      
      {/* Horizontal white gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/100 to-transparent" />

      {/* Background SVG */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* <ParallaxMerger /> */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
