'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import FeatureCard from '@/components/feature-card'
import { features } from '@/lib/features'
import ParallaxMerger from '@/components/ParallaxMerger'
import { StepCarousel } from '@/components/StepCarousel'
import Image from 'next/image'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)
    }

    // Add passive flag to improve scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              maas
            </span>
            <nav className="flex space-x-4">
              <Link href="/signin">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="">
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden">
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
          
          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen pt-24 py-12">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-center md:text-left">
                <div className="flex flex-col justify-center">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-atomic-md">
                    <span>Streamline Your M&A Process with</span>{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text font-sans">
                      maas
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-8">
                    <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text font-sans">
                      maas
                    </span>
                    {' '}simplifies mergers and acquisitions, connecting buyers and sellers while providing AI-powered assistance throughout the entire process.
                  </p>
                  <div>
                    <Link href="/signup">
                      <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 flex justify-center md:justify-end items-center">
                <div className="w-full">
                  <Image 
                    src="/sample.svg"
                    alt="M&A Process Visualization"
                    width={1920}
                    height={1920}
                    priority
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step Carousel Section */}
        <section className="py-8">
          <StepCarousel />
        </section>

        {/* Features Section */}
        <section className="pt-8 pb-16 mt-[-2rem]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-atomic-md">
              Powerful Features to Simplify Your M&A Journey
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 font-atomic-md">
              Ready to Transform Your M&A Process?
            </h2>
            <p className="text-xl text-white mb-8">
              Join{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text font-sans">
                maas
              </span>
              {' '}today and experience a smarter way to handle mergers and acquisitions.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>
            &copy; 2025{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text font-sans">
              maas
            </span>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

