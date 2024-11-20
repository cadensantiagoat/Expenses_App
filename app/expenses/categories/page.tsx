import { H2, H3, H4 } from '@/components/ui/typography'
import {CategoryOverview} from '../components/category-overview'
import { groupExpensesByCategory, getCategoriesAndTransactions } from '@/actions/categories'
import { buildChartData } from '@/utils/utils'
import {CategoryContent} from './category-content'
import { getExpenseDataForDashboard } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'

const CategoryPage = async () => {
  const groupedExpenses = await groupExpensesByCategory();
  const categories = await getCategoriesAndTransactions();
  const user = await getCurrentUser()
  const { transactions } = await getExpenseDataForDashboard(user.id)

  const chartData = await buildChartData(groupedExpenses, categories);
    return (
        <div className='col-span-full h-full row-span-full px-3'>
          {/* PAGE HEADER */}
          {/* TOP COMPONENT */}
          <div className='flex pb-6'>
            <CategoryOverview chartData={chartData} categories={categories} groupedExpenses={groupedExpenses} />
          </div>
          {/* BODY COMPONENT */}
          <div className='category-body'>
            <CategoryContent categories={categories} groupedExpenses={groupedExpenses} transactions={transactions} />
          </div>
        </div>    
    )
}

export default CategoryPage