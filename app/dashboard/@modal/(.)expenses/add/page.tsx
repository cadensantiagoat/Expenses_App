import { getCurrentUser } from '@/utils/auth'
import { getCategories } from '@/actions/categories'

import { ModalWithConfirmation } from '@/components/Dialog'
import ExpenseForm from '@/components/forms/expense-form'

const expense = {
  title: '',
  amount: '',
  description: '',
  categoryName: '',
  monthlyDueDate: new Date(),
}

type Category = {
  id: string
  name: string
  userId?: string
  color?: string
  icon?: string
}

const AddExpensePage = async () => {
  const user = await getCurrentUser()
  const categories = await getCategories(user.id)

  return (
    <ModalWithConfirmation title='Create'>
      <ExpenseForm expense={expense} categories={categories} />
    </ModalWithConfirmation>
  )
}

export default AddExpensePage
