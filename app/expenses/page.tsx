import React from 'react'
import { getCurrentUser } from '@/utils/auth'
import { getAllExpenses, getExpenseDataForDashboard } from '@/actions/expenses'
import { ExpensesOverview } from './components/expenses-overview'
import { columns } from '@/components/table-data/columns'
import { DataTable } from '@/components/table-data/data-table'
import { getCategoriesAndTransactions } from '@/actions/categories'

const ExpensesPage = async () => {
  const user = await getCurrentUser()
  const expenses = await getAllExpenses(user.id)
  const categories = await getCategoriesAndTransactions(user.id)
  const data = await getExpenseDataForDashboard(user.id)

  return (
    <>
      <ExpensesOverview expenses={data.transactions} total={data.total} />
      <div className='expenses-page bg-sidebar p-3 border rounded-lg mt-3 h-full'>
        <DataTable columns={columns} data={expenses} categories={categories} />
      </div>
    </>
  )
}

export default ExpensesPage
