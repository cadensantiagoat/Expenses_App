import { getOneExpense } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { redirect } from 'next/navigation'
import { H3 } from '@/components/ui/typography'
import type { Expense } from '@/utils/types'
import { DialogModal } from '@/components/Dialog'

type Props = {
  params: { id: string }
}

const ExpenseDetailPage = async ({ params: { id } }: Props) => {
  const user = await getCurrentUser()
  const expense = await getOneExpense(user.id, id)

  if (!expense) redirect('/dashboard/expenses')

  return <DialogModal title={expense.title}>{expense.amount.toString()}</DialogModal>
}

export default ExpenseDetailPage
