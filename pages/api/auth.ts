import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Helper function to generate JWT
const generateToken = (user: any) => {
  return jwt.sign(
    { 
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      accountType: user.accountType 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password, firstName, lastName, accountType, mode, googleToken } = req.body

    // Debug log
    console.log('Received request:', {
      email,
      firstName,
      lastName,
      accountType,
      mode,
      hasGoogleToken: !!googleToken
    })

    // Handle Google OAuth
    if (mode === 'google') {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: googleToken,
          audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()
        if (!payload) {
          return res.status(400).json({ error: 'Invalid Google token' })
        }

        let user = await prisma.user.findUnique({
          where: { email: payload.email }
        })

        if (!user) {
          // Create new user from Google data
          user = await prisma.user.create({
            data: {
              email: payload.email!,
              password: '', // Empty password for Google users
              firstName: payload.given_name || '',
              lastName: payload.family_name || '',
              accountType: accountType || 'BUYER', // Default to BUYER if not specified
            },
          })
        }

        const token = generateToken(user)
        return res.status(200).json({ user, token })
      } catch (error) {
        console.error('Google auth error:', error)
        return res.status(401).json({ error: 'Invalid Google token' })
      }
    }

    // Handle regular signup
    if (mode === 'signup') {
      console.log('Processing signup:', { email, firstName, lastName, accountType })
      
      if (!email || !password || !firstName || !lastName || !accountType) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            accountType,
          },
        })

        console.log('Created user:', user)
        const token = generateToken(user)
        const { password: _, ...userWithoutPassword } = user

        return res.status(201).json({ user: userWithoutPassword, token })
      } catch (error) {
        console.error('Signup error:', error)
        return res.status(500).json({ error: 'Failed to create user' })
      }
    }

    // Handle regular signin
    if (mode === 'signin') {
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' })
      }

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          firstName: true,
          lastName: true,
          accountType: true
        }
      })

      if (user && await bcrypt.compare(password, user.password)) {
        const token = generateToken(user)
        const { password: _, ...userWithoutPassword } = user
        return res.status(200).json({ user: userWithoutPassword, token })
      } else {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
    }

    return res.status(400).json({ error: 'Invalid mode' })

  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    await prisma.$disconnect()
  }
} 