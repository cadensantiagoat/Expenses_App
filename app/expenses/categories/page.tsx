import { groupExpensesByCategory, getCategoriesAndTransactions } from '@/actions/categories'
import { SkeletonOverview } from '@/components/loaders/skeletons'
import { CategoryList } from '../components/category-list'
import { buildChartData } from '@/utils/utils'
import { getCurrentUser } from '@/utils/auth'
import dynamic from 'next/dynamic'

const DynamicOverview = dynamic(
  () => import('../components/category-overview').then((mod) => mod.CategoryOverview),
  {
    ssr: false,
    loading: () => <SkeletonOverview />,
  }
)

const CategoryPage = async () => {
  const user = await getCurrentUser()
  const categories = await getCategoriesAndTransactions(user.id)
  const groupedExpenses = await groupExpensesByCategory()
  const chartData = await buildChartData(groupedExpenses, categories)

  return (
    <>
      <div className='w-full'>
        <DynamicOverview chartData={chartData} />
      </div>
      <div className='flex w-full h-full py-6'>
        <CategoryList categories={categories} />
      </div>
    </>
  )
}

export default CategoryPage
