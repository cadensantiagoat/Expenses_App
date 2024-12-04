import { buildChartData } from '@/utils/utils'
import { ExpensesOverview } from '../components/expenses-overview'
import { CategoryOverview } from '../components/category-overview'
import { getExpenseDataForDashboard } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { groupExpensesByCategory, getCategoriesAndTransactions } from '@/actions/categories'

const OverviewSlot = async () => {
  const groupedExpenses = await groupExpensesByCategory()
  const categories = await getCategoriesAndTransactions()
  // const chartData = await buildChartData(groupedExpenses, categories);

  const user = await getCurrentUser()
  const data = await getExpenseDataForDashboard(user.id)

  return (
    <div className='flex'>
      <ExpensesOverview total={data.total} data={data} />
      {/* <CategoryOverview chartData={chartData} categories={categories} groupedExpenses={groupedExpenses} /> */}
    </div>
  )
}

export default OverviewSlot
