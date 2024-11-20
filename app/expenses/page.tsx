import React from 'react'
import { getCurrentUser } from '@/utils/auth'
import { getAllExpenses } from '@/actions/expenses'
import { columns } from '@/components/table-data/columns'
import { DataTable } from '@/components/table-data/data-table'
import { getExpenseDataForDashboard } from '@/actions/expenses'
import { groupExpensesByCategory, getCategoriesAndTransactions, getCategories } from '@/actions/categories'
import CategoryFormModal from '@/components/category-modal-form'


const ExpensesPage = async () => {
  const user = await getCurrentUser()
  const expenses = await getAllExpenses(user.id)
  const categories = await getCategoriesAndTransactions()

  return (
    <div className='grid grid-cols-expensesGrid gap-3'>
      <DataTable columns={columns} data={expenses} categories={categories} />
      <CategoryFormModal />
    </div>
  )
}

export default ExpensesPage
