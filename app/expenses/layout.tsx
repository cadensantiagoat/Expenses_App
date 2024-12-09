import React from 'react'
import Shell from '@/components/shell/Shell'
import { Header } from './components/header-component'
import { ExpenseFormModal } from './components/expense-modal'
import { getCategories } from '@/actions/categories'
import { getCurrentUser } from '@/utils/auth'
import CategoryFormModal from '@/app/expenses/components/category-modal'

type Props = {
  children: React.ReactNode
  overview: React.ReactNode
}

const ExpensesLayout = async ({ children }: Props) => {
  const user = await getCurrentUser()
  const categories = await getCategories(user.id)

  return (
    <Shell>
      <div className='h-[calc(100%-64px)] px-3 flex flex-col'>
        {/* HEADER COMPONENT renders:
              - Overview slot
              - Tab links that toggle between 'manage' and 'category' views
              - Add Expense, Add Category buttons 
        */}
        <Header />

        {/* Renders the data-table or category-table depending on URL */}
        {children}
        <ExpenseFormModal categories={categories} />
        <CategoryFormModal />
      </div>
    </Shell>
  )
}

export default ExpensesLayout
