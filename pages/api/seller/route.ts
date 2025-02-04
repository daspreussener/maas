import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: number }
    
    const { 
      businessDescription,
      industry,
      operationLocation,
      lastYearRevenue,
      nextYearRevenue,
      leadershipStyle,
      riskTolerance,
      vision,
      negotiationStyle,
      dealProcessPreference,
      photos
    } = req.body

    const sellerProfile = await prisma.seller.create({
      data: {
        userId: decoded.id,
        businessDescription,
        industry,
        operationLocation,
        lastYearRevenue,
        nextYearRevenue,
        leadershipStyle,
        riskTolerance,
        vision,
        negotiationStyle,
        dealProcessPreference,
        photos
      }
    })

    return res.status(201).json(sellerProfile)
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Failed to create seller profile' })
  } finally {
    await prisma.$disconnect()
  }
}

