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
    
    const { firstName, lastName, email } = req.body

    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        firstName,
        lastName,
        email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        accountType: true,
      }
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error('API Error:', error)
    return res.status(401).json({ error: 'Failed to update user' })
  } finally {
    await prisma.$disconnect()
  }
} 