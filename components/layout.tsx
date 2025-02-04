'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Home, DollarSign, Users, Settings, ChevronRight, File, LogOut, Menu, X } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null)

  useEffect(() => {
    const fetchUserData = () => {
      // Try to get user data from localStorage
      const userData = localStorage.getItem('user')
      console.log('Fetched user data:', userData)
      
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData)
          console.log('Parsed user:', parsedUser)
          if (parsedUser.firstName && parsedUser.lastName) {
            setUser(parsedUser)
          }
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }
    }

    fetchUserData()
    // Set up an interval to check for user data updates
    const interval = setInterval(fetchUserData, 1000)
    
    return () => clearInterval(interval)
  }, [])

  console.log('Current user state:', user)

  const handleLogout = () => {
    // Clear cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // Redirect
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Mobile Header */}
      <header className="bg-white md:hidden fixed top-0 left-0 right-0 z-30">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-indigo-600">maas</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar for desktop / Mobile menu */}
      <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:w-64 bg-white md:block fixed md:static top-16 left-0 right-0 z-20`}>
        <div className="p-4 md:block hidden">
          <h1 className="text-2xl font-bold text-indigo-600">maas</h1>
        </div>
        <div className="p-4 border-b">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full mr-3"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
            />
            <span className="text-sm font-medium text-gray-700">
              {user && user.firstName && user.lastName 
                ? `${user.firstName} ${user.lastName}`
                : 'John Doe'}
            </span>
          </div>
        </div>
        <nav className="mt-8">
          <Link href="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600">
            <Home className="inline-block mr-2" size={18} />
            Dashboard
          </Link>
          <Link href="/business-profile" className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600">
            <DollarSign className="inline-block mr-2" size={18} />
            Business Profile
          </Link>
          <Link href="/buyers" className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600">
            <Users className="inline-block mr-2" size={18} />
            Potential Buyers
          </Link>
          <Link href="/settings" className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600">
            <Settings className="inline-block mr-2" size={18} />
            Settings
          </Link>
          <Link href="/financial-documents" className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600">
            <File className="inline-block mr-2" size={18} />
            Financial Documents
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <LogOut className="inline-block mr-2" size={18} />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex overflow-hidden transition-all duration-200 ${isMobileMenuOpen ? 'md:mt-0 mt-[400px]' : 'md:mt-0 mt-16'}`}>
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              {/* You can add a page title or other content here if needed */}
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

