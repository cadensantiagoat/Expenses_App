'use server'
import { prisma } from '@/utils/db'
import { memoize } from 'nextjs-better-unstable-cache'
import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/utils/auth'
import { Prisma } from '@prisma/client'
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

  try {
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
    // UPDATE
    else {
      response = await prisma.category.update({
        where: { id: category.id },
        data: {
          userId: category.userId,
          name: category.name,
          color: category.color,
          icon: category.icon,
        },
      })
      message = 'Category updated.'
    }
    revalidatePath('/expenses')
    revalidatePath('/expenses/categories')
    return { message, response }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return {
          message: `Please try again.`,
          errors: { message: `A category with this name already exists.` },
        }
      }
    }
    return { message: `Something went wrong.`, errors: { message: `Database Error: Unknown` } }
  }
}

/* ------ CREATE ------ */
// implement CREATE and UPDATE functions individually
// then compose 'upsertCategory' using the two functions.

/* ------ READ ------ */
export const getCategories = async (userId: string) => {
  const categories = await prisma.category.findMany({
    where: { userId: userId },
  })

  if (!categories) return { message: 'get categories failed' }

  return categories
}

export const getCategoriesAndTransactions = memoize(
  async (userId: string) => {
    try {
      const categories = await prisma.category.findMany({
        where: { userId: userId },
        include: {
          transactions: true,
        },
      })

      return categories
    } catch (e) {
      return { message: 'GET failed', error: e.message }
    }
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

export const deleteCategory = async (categoryId: string) => {
  try {
    await prisma.category.delete({ where: { id: categoryId } })
    revalidatePath('/expenses/categories')
    revalidatePath('/expenses')
    return { message: 'Delete successful.' }
  } catch (e) {
    return { message: 'Delete failed.', error: true }
  }
}
