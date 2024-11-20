import { getCurrentUser } from '@/utils/auth'
import { getExpenseDataForDashboard } from '@/actions/expenses'
import { groupExpensesByCategory, getCategoriesAndTransactions } from '@/actions/categories'
import { CategoryTable } from '@/app/expenses/components/category-table'

const CategoryPage = async () => {
  const user = await getCurrentUser()
  const groupedExpenses = await groupExpensesByCategory()
  const categories = await getCategoriesAndTransactions()
  const { transactions } = await getExpenseDataForDashboard(user.id)

  return (
    <div className='col-span-full h-full row-span-full px-3'>
      <div className='category-body'>

            <div className='flex w-full h-full'>
      <CategoryTable
        categories={categories}
        groupedExpenses={groupedExpenses}
        transactions={transactions}
      />
    </div>
      </div>
    </div>
  )
}

export default CategoryPage
