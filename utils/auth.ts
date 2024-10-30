import 'server-only'
import { auth } from '@clerk/nextjs/server'
import { prisma } from './db'
import { redirect } from 'next/navigation'
import { cache } from 'react'

// Same function as below, refactor into one and test that it works.
export const getUserByClerkID = async () => {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  })

  return user
}

// Only used when user needs to access data on the server.
// B/C routes are protected
export const getCurrentUser = cache(async () => {
  const { userId } = await auth() // userId from Clerk

  if (!userId) {
    redirect('/sign-in')
  }

  // use userId from Clerk to retrieve user from DB
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  return user
})
