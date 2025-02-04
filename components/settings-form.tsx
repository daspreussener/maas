'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function SettingsForm() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  })

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setPersonalInfo({
          firstName: user.firstName || 'John',
          lastName: user.lastName || 'Doe',
          email: user.email || 'john.doe@example.com',
        })
      } catch (error) {
        console.error('Error parsing user data:', error)
        // Keep fallback values if there's an error
      }
    }
  }, [])

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '**** **** **** 1234',
    expiryDate: '12/25',
    cvv: '***',
  })

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          email: personalInfo.email,
        }),
      })

      if (res.ok) {
        const updatedUser = await res.json()
        // Update localStorage with new data
        localStorage.setItem('user', JSON.stringify(updatedUser))
        alert('Changes saved successfully!')
      } else {
        throw new Error('Failed to save changes')
      }
    } catch (error) {
      console.error('Error saving changes:', error)
      alert('Failed to save changes. Please try again.')
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordInfo.newPassword !== passwordInfo.confirmNewPassword) {
      alert('New passwords do not match')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/user/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordInfo.currentPassword,
          newPassword: passwordInfo.newPassword,
        }),
      })

      if (res.ok) {
        alert('Password updated successfully!')
        // Clear password fields
        setPasswordInfo({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        })
      } else {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update password')
      }
    } catch (error) {
      console.error('Error updating password:', error)
      alert(error instanceof Error ? error.message : 'Failed to update password')
    }
  }

  const handlePaymentInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updated payment info:', paymentInfo)
    // Handle payment info update
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Personal Information Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Personal Information</h2>
        <p className="text-sm text-gray-500 mb-4">Update your personal details here.</p>
        <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={personalInfo.firstName}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={personalInfo.lastName}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
            Save Changes
          </Button>
        </form>
      </Card>

      {/* Password Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Password</h2>
        <p className="text-sm text-gray-500 mb-4">Change your password here.</p>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordInfo.currentPassword}
              onChange={(e) => setPasswordInfo(prev => ({ ...prev, currentPassword: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordInfo.newPassword}
              onChange={(e) => setPasswordInfo(prev => ({ ...prev, newPassword: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              value={passwordInfo.confirmNewPassword}
              onChange={(e) => setPasswordInfo(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
            />
          </div>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
            Update Password
          </Button>
        </form>
      </Card>

      {/* Payment Information Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Payment Information</h2>
        <p className="text-sm text-gray-500 mb-4">Update your payment details here.</p>
        <form onSubmit={handlePaymentInfoSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              value={paymentInfo.cvv}
              onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
              disabled
            />
          </div>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
            Update Payment Info
          </Button>
        </form>
      </Card>
    </div>
  )
}

