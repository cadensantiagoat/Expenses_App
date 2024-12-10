'use server'

import { prisma } from '@/utils/db'
import { memoize } from 'nextjs-better-unstable-cache'
import { revalidateTag } from 'next/cache'
import { getCurrentUser } from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { ExpenseSchema } from '@/utils/schemas/Expense'
import type { Expense } from '@/utils/schemas/Expense'
import { normalizeDate } from '@/utils/utils'

type ReturnType = {
  message: string
  errors?: Record<string, unknown>
  error?: any
  response?: Expense
}

export async function updateOrCreateExpense(expense: Expense): Promise<ReturnType> {
  const parsed = ExpenseSchema.safeParse(expense)

  if (!parsed.success) {
    return {
      message: 'Submission failed.',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const user = await getCurrentUser()
    let message, response

    const dueDate = normalizeDate(expense.monthlyDueDate)
    const day = dueDate.getDate()
    const month = dueDate.getMonth()

    // if the expense has an ID
    if (expense.id) {
      // update it
      response = await prisma.transaction.update({
        where: { id: expense.id },
        data: {
          id: expense.id,
          userId: user.id,
          title: expense.title,
          amount: expense.amount,
          monthlyDueDate: expense.monthlyDueDate,
          dueDay: day,
          dueMonth: month,
          description: expense.description,
          categoryId: expense.categoryId,
          autopayEnabled: expense.autopayEnabled,
        },
      })
      message = 'Updated expense.'
    } else {
      // create it
      response = await prisma.transaction.create({
        data: {
          userId: user.id,
          title: expense.title,
          amount: expense.amount,
          monthlyDueDate: expense.monthlyDueDate,
          dueDay: day,
          dueMonth: month,
          description: expense.description,
          categoryId: expense.categoryId,
          autopayEnabled: expense.autopayEnabled,
        },
      })
      message = 'Created expense.'
    }
    revalidatePath('/expenses')
    return { message, response }
  } catch (error) {
    return { message: 'Something went wrong.', errors: true, error: error.message }
  }
}

// Gets and returns an ordered list of transactions by userId
export const getAllExpenses = memoize(
  async (userId: string) => {
    const data = await prisma.transaction.findMany({
      where: { userId: userId },
      include: { category: true },
      orderBy: [{ monthlyDueDate: 'desc' }],
    })

    return data ?? []
  },
  // CACHING
  {
    persist: true,
    // 'revalidateTags' are the tags you have to call when you want to invalidate cache after changes.
    // Pass these tags to other cache-busting function (discuss later)
    revalidateTags: () => ['dashboard:expenses'],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'dashboard:expenses',
  }
)

export const getOneExpense = async (userId: string, expenseId: string) => {
  // await delay()

  const expense = await prisma.transaction.findFirst({
    where: {
      AND: {
        userId: userId,
        id: expenseId,
      },
    },
  })

  return expense
}

// Relationally queries user and their transactions
// Returns the total number of expenses and sum of all expense amounts
export const getExpenseDataForDashboard = memoize(
  async (userId: string) => {
    const userWithTransactions = await prisma.user.findFirst({
      where: { id: userId },
      include: { transactions: true },
    })

    const response = JSON.parse(JSON.stringify(userWithTransactions))

    const total = response.transactions
      .reduce(
        (accumulator: number, currentValue: any) => accumulator + parseFloat(currentValue.amount),
        0
      )
      .toFixed(2)

    return {
      total,
      count: response.transactions.length,
      transactions: response.transactions,
    }
  },
  // CACHING
  {
    persist: true,
    revalidateTags: (slug) => ['dashboard:expensesTotalAndCount', slug],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'dashboard:expensesTotalAndCount',
  }
)

export const deleteExpense = async (id: string) => {
  try {
    await prisma.transaction.delete({ where: { id: id } })
    revalidatePath('/expenses')
    revalidatePath('/expenses/categories')
    return { message: 'Delete successful' }
  } catch (error) {
    return { message: 'Something went wrong.', error: error.message }
  }
}
