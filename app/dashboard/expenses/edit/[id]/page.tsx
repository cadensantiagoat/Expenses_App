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

  if (!expense?.id) {
    return (
      <div className='p-8 max-w-md space-y-2'>
        <H3>No expense found for that ID.</H3>
      </div>
    )
  }

  //   if (!expense) redirect('/dashboard/expenses')

  return (
    <div className='p-3'>
      <H3>Edit {expense.title}</H3>
    </div>
  )
}

export default ExpenseDetailPage
