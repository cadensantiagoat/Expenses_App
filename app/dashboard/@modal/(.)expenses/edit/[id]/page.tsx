import { getOneExpense } from '@/actions/expenses'
import { getCategories } from '@/actions/categories'
import { getCurrentUser } from '@/utils/auth'
import { H3 } from '@/components/ui/typography'
import { ModalWithConfirmation } from '@/components/Dialog'
import ExpenseForm from '@/components/forms/expense-form'

type Props = {
  params: { id: string }
}

const ExpenseDetailPage = async ({ params: { id } }: Props) => {
  const user = await getCurrentUser()
  const expense = await getOneExpense(user.id, id)
  const categories = await getCategories(user.id)

  if (!expense?.id) {
    return (
      <ModalWithConfirmation title='Ooops'>
        <div className='p-8 max-w-md space-y-2'>
          <H3>No expense found for that ID.</H3>
        </div>
      </ModalWithConfirmation>
    )
  }

  return (
    <ModalWithConfirmation title={`Edit ${expense.title}`}>
      <ExpenseForm expense={expense} categories={categories} />
    </ModalWithConfirmation>
  )
}

export default ExpenseDetailPage
