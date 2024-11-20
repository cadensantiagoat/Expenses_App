import React from 'react'
import { getAllExpenses } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { DataTable } from '@/components/table-data/data-table'
import { columns } from '@/components/table-data/columns'
import {
  getCategories,
  groupExpensesByCategory,
  getCategoriesAndTransactions,
} from '@/actions/categories'
import { H1, H2, H3, H4, Small, Muted, Large } from '@/components/ui/typography'
import { ExpensesOverview } from '../../expenses/components/expenses-overview'
import { CategoryOverview } from '../../expenses/components/category-overview'
import { buildChartData } from '@/utils/utils'

import CategoryFormModal from '@/components/category-modal-form'

const ExpensesPage = async () => {
  const user = await getCurrentUser()
  const expenses = await getAllExpenses(user.id)
  // const categories = await getCategories(user.id)
  const groupedExpenses = await groupExpensesByCategory()
  const categories = await getCategoriesAndTransactions()

  const chartData = await buildChartData(groupedExpenses, categories)

  return (
    // LAYOUT: wrapper div sets height and width to full grid.
    <div className='col-span-full h-full row-span-full px-3'>
      <div className='flex items-baseline justify-between py-8'>
        <H2 className='border-0'>Expenses</H2>
        <H4>Thursday, November 6</H4>
      </div>
      <div className='grid grid-cols-expensesGrid gap-3'>
        <ExpensesOverview />
        <CategoryOverview
          chartData={chartData}
          categories={categories}
          groupedExpenses={groupedExpenses}
        />
        {/* Grid placement for Table is set in the component */}
        <DataTable columns={columns} data={expenses} categories={categories} />
        <CategoryFormModal />
      </div>
    </div>
  )
}

export default ExpensesPage
