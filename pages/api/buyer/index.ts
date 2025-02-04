import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const config = {
  api: {
    bodyParser: true,
  },
}

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Log incoming request
  console.log('Method:', req.method)
  console.log('Headers:', req.headers)
  console.log('Body:', req.body)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      console.error('JWT_SECRET is not configured')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' })
    }
    
    const [bearer, token] = authHeader.split(' ')
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Invalid authorization format' })
    }

    // Log token verification
    console.log('Verifying token:', token)
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload
    console.log('Decoded token:', decoded)

    if (!decoded || typeof decoded.id !== 'number') {
      return res.status(401).json({ error: 'Invalid token payload' })
    }

    // Log Prisma operation
    console.log('Creating buyer with data:', {
      userId: decoded.id,
      ...req.body
    })

    const buyer = await prisma.buyer.create({
      data: {
        userId: decoded.id,
        companyName: req.body.companyName || '',
        country: req.body.country,
        state: req.body.state,
        phoneNumber: req.body.phoneNumber,
        businessInterest: req.body.businessInterest,
        wouldInvest: Boolean(req.body.wouldInvest),
        isAccredited: Boolean(req.body.isAccredited),
        businessCount: req.body.businessCount,
        businessExperience: req.body.businessExperience,
        acquisitionDetails: req.body.acquisitionDetails,
        interestedIndustries: req.body.interestedIndustries,
        interestedBusinessModels: req.body.interestedBusinessModels,
        preferredLocations: req.body.preferredLocations,
        acquisitionBudget: req.body.acquisitionBudget,
        dealSizeMin: req.body.dealSizeMin,
        dealSizeMax: req.body.dealSizeMax,
        requiresFinancing: Boolean(req.body.requiresFinancing)
      }
    })

    return res.status(201).json(buyer)
  } catch (error) {
    // Detailed error logging
    console.error('API Error Details:')
    console.error('Type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Message:', error instanceof Error ? error.message : error)
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create buyer profile',
      type: error instanceof Error ? error.constructor.name : typeof error
    })
  } finally {
    await prisma.$disconnect()
  }
} 