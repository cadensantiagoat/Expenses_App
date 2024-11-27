'use server'
// import 'server-only';
import { prisma } from '@/utils/db'
import { delay } from '@/utils/delay'
import { memoize } from 'nextjs-better-unstable-cache'
import { revalidateTag } from 'next/cache'
import { getCurrentUser } from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { ExpenseSchema } from '@/utils/schemas/Expense'
import type { Expense } from '@/utils/schemas/Expense'

type ReturnType = {
  message: string
  errors?: Record<string, unknown>
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

  const user = await getCurrentUser()
  let message
  let response

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
        description: expense.description,
        categoryName: expense.categoryName,
        autopayEnabled: expense.autopayEnabled
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
        description: expense.description,
        categoryName: expense.categoryName,
        autopayEnabled: expense.autopayEnabled
      },
    })
    message = 'Created expense.'
  }
  revalidatePath('/expenses')
  // revalidatePath('/dashboard/expenses')
  return { message, response }
}

// Gets and returns an ordered list of transactions by userId
export const getAllExpenses = memoize(
  async (userId: string) => {
    // simulates random load time (REMOVE)
    await delay()

    const data = await prisma.transaction.findMany({
      where: { userId: userId },
      include: {category: true },
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
  await delay()

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
    // simulates random load time (REMOVE)
    await delay()

    const userWithTransactions = await prisma.user.findFirst({
      where: { id: userId },
      include: { transactions: true },
    })

    const response = JSON.parse(JSON.stringify(userWithTransactions))

    const total = response.transactions
      .reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + parseFloat(currentValue.amount),
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
  await prisma.transaction.delete({ where: { id: id } });
  console.log('transaction deleted: ID: ', id);
  revalidatePath('/expenses');
};
