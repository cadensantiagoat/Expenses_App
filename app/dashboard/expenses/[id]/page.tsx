import { getOneExpense } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { redirect } from 'next/navigation'
import { H3 } from '@/components/ui/typography'

type Props = {
  params: { id: string }
}

const ExpenseDetailPage = async ({ params: { id } }: Props) => {
  const user = await getCurrentUser()
  const expense = await getOneExpense(user.id, id)

  if (!expense) redirect('/dashboard/expenses')

  return (
    <div className='p-3'>
      <H3>{expense.title}</H3>
    </div>
  )
}

export default ExpenseDetailPage
