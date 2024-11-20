import React from 'react'
import { getAllExpenses } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { DataTable } from '@/components/table-data/data-table'
import { columns } from '@/components/table-data/columns'
import { getExpenseDataForDashboard } from '@/actions/expenses'
import { groupExpensesByCategory, getCategoriesAndTransactions } from '@/actions/categories'
import { buildChartData } from '@/utils/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {CategoryContent} from './categories/category-content'

import CategoryFormModal from '@/components/category-modal-form'

const ExpensesPage = async () => {
  const user = await getCurrentUser()
  const expenses = await getAllExpenses(user.id)
  const groupedExpenses = await groupExpensesByCategory();
  const categories = await getCategoriesAndTransactions();
  const { transactions } = await getExpenseDataForDashboard(user.id)


  return (
    <div className='grid grid-cols-expensesGrid gap-3'>
              <Tabs defaultValue='manage' className='w-full'>
        <TabsList>
            
          <TabsTrigger value='manage'>
      manage
            </TabsTrigger>
          
            <TabsTrigger value='categories'>
categories
            </TabsTrigger>
        </TabsList>
        <TabsContent value='manage'>
        <DataTable columns={columns} data={expenses} categories={categories} />
        </TabsContent>
        <TabsContent value='categories'>
        <CategoryContent categories={categories} groupedExpenses={groupedExpenses} transactions={transactions} />
    </TabsContent>
        </Tabs>
    
    <CategoryFormModal />
  </div>
  )
}

export default ExpensesPage
