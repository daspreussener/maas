import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      userId,
      companyName,
      country,
      state,
      phoneNumber,
      businessInterest,
      wouldInvest,
      isAccredited,
      businessCount,
      businessExperience,
      acquisitionDetails,
      interestedIndustries,
      interestedBusinessModels,
      preferredLocations,
      acquisitionBudget,
      dealSizeMin,
      dealSizeMax,
      requiresFinancing
    } = body

    const buyerProfile = await prisma.buyer.create({
      data: {
        userId,
        companyName,
        country,
        state,
        phoneNumber,
        businessInterest,
        wouldInvest,
        isAccredited,
        businessCount,
        businessExperience,
        acquisitionDetails,
        interestedIndustries,
        interestedBusinessModels,
        preferredLocations,
        acquisitionBudget,
        dealSizeMin,
        dealSizeMax,
        requiresFinancing
      }
    })

    return NextResponse.json(buyerProfile, { status: 201 })
  } catch (error) {
    console.error('Error in buyer onboarding:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}