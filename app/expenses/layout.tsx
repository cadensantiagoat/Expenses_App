import React from 'react'
import Shell from '@/components/shell/Shell'
import { Header } from './components/header-component'
import { ExpenseFormModal } from './components/expense-form-modal'
import {  getCategories } from '@/actions/categories'
import { getCurrentUser } from '@/utils/auth'


type Props = {
  children: React.ReactNode
  overview: React.ReactNode
}

const ExpensesLayout = async ({ children, overview }: Props) => {
  const user = await getCurrentUser()
  const categories = await getCategories(user.id)

  return (
    <Shell>
      <div className='col-span-full h-full row-span-full px-3'>
        {/* HEADER COMPONENT renders:
              - Overview slot
              - Tab links that toggle between 'manage' and 'category' views
              - Add Expense, Add Category buttons 
        */}
        <Header>
          {overview}
        </Header>
        
        {/* Renders the data-table or category-table depending on URL */}
        {children}
        <ExpenseFormModal categories={categories} />
      </div>
    </Shell>
  )
}

export default ExpensesLayout
