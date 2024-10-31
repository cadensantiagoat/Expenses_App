import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { ExpenseTable } from '@/app/dashboard/_components/expense-table'
// import AddNewExpense from './_components/AddNewExpense'
// import CreateCategory from './_components/CreateCategory'
// import { CategoryTable } from './_components/CollapsibleTable'

// import { getCurrentUser } from '@/utils/auth'
// import { getExpenseDataForDashboard } from '@/actions/expenses'
// import {
//   getCategories,
//   getCategoriesAndTransactions,
//   groupExpensesByCategory,
// } from '@/actions/categories'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DashboardPage = async () => {
  /* --- commenting this out to stop making these calls while working on '/expenses' page --- */

  // const user = await getCurrentUser()
  // const { total, count, transactions } = await getExpenseDataForDashboard(user.id)
  // const categoryData = await getCategoriesAndTransactions()
  // const groups = await groupExpensesByCategory()
  // const categories = await getCategories(user.id)

  return (
    <div>
      <Tabs defaultValue='all' className='w-full'>
        <TabsList>
          <TabsTrigger value='all'>dashboard</TabsTrigger>
          <TabsTrigger value='categories'>stuff</TabsTrigger>
        </TabsList>
        <TabsContent value='all'>
          <Card>
            {/* <CardHeader>
              <div className='flex justify-between items-center'>
                <CardTitle>Expenses</CardTitle>
                <AddNewExpense categories={categories} />
              </div>
            </CardHeader>
            <CardContent>
              <ExpenseTable data={transactions} total={total} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='categories'>
          <Card>
            <CardHeader>
              <div className='flex justify-between items-center'>
                <CardTitle>Categories</CardTitle>
                <CreateCategory />
              </div>
            </CardHeader>
            <CardContent>
              <CategoryTable categories={groups} expenses={transactions} />
            </CardContent> */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DashboardPage
