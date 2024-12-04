'use server'
import { prisma } from '@/utils/db'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { delay } from '@/utils/delay'
import { memoize } from 'nextjs-better-unstable-cache'
import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/utils/auth'
import { CategorySchema, type Category } from '@/utils/schemas/Category'

type ReturnType = {
  message: string
  errors?: Record<string, unknown>
  response?: Category
}

export const upsertCategory = async (category: Category): Promise<ReturnType> => {
  const parsed = CategorySchema.safeParse(category)

  if (!parsed.success) {
    return {
      message: 'Submission failed.',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const user = await getCurrentUser()
  let message
  let response

  // CREATE
  if (!category.id) {
    response = await prisma.category.create({
      data: {
        userId: user.id,
        name: category.name,
        color: category.color,
        icon: category.icon,
      },
    })
    message = 'Category created.'
  }

  return { message, response }
}

/* ------ CREATE ------ */
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

/* ------ READ ------ */
export const getCategories = async (userId: string) => {
  const categories = await prisma.category.findMany({
    where: { userId: userId }
  })

  if (!categories) return { message: 'get categories failed' }

  return categories
}

export const getCategoriesAndTransactions = memoize(
  async () => {
    const user = await getCurrentUser()
    const categories = await prisma.category.findMany({
      where: { userId: user.id },
      include: {
        transactions: true,
        
      },
    })

    return categories
  },
  {
    persist: true,
    revalidateTags: () => ['user:categories'],
    log: ['datacache', 'dedupe'],
    logid: 'user:categories',
  }
)

export const groupExpensesByCategory = memoize(
  async () => {
    const user = await getCurrentUser()

    const groupedExpenses = await prisma.transaction.groupBy({
      by: ['categoryId'],
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
