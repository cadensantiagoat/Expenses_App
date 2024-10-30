'use server'
import { prisma } from '@/utils/db'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { delay } from '@/utils/delay'
import { memoize } from 'nextjs-better-unstable-cache'
import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/utils/auth'

export const createCategory = async (name: string) => {
  // await delay(2000);
  try {
    const user = await getCurrentUser()
    const category = await prisma.category.create({
      data: {
        name: name,
        userId: user.id,
        color: 'default',
        // icon: 'icon-name',
      },
    })

    revalidatePath('/dashboard')

    return { success: true, data: category }
  } catch (e) {
    console.error(e)
    return { message: 'Error creating category.' }
  }
}

export const groupExpensesByCategory = memoize(
  async () => {
    const user = await getCurrentUser()

    const groupedExpenses = await prisma.transaction.groupBy({
      by: ['categoryName'],
      where: {
        userId: user.id,
      },
      _sum: {
        amount: true,
      },
      _count: true,
    })

    return groupedExpenses
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:category'],
    log: ['datacache', 'dedupe'],
    logid: 'dashboard:category',
  }
)

export const getCategoriesByUser = memoize(
  async () => {
    const user = await getCurrentUser()
    const categories = await prisma.user.findFirst({
      where: { id: user.id },
      include: {
        categories: {
          include: {
            transactions: true,
          },
        },
      },
    })

    console.log(categories)

    return categories
  },
  {
    persist: true,
    revalidateTags: () => ['user:categories'],
    log: ['datacache', 'dedupe'],
    logid: 'user:categories',
  }
)
