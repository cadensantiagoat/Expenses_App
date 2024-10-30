import { getAllExpenses } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { H3 } from '@/components/ui/typography'
import { DataTable } from '@/components/table/data-table'
import { columns } from '@/components/table/columns'

const ExpensesPage = async () => {
  const user = await getCurrentUser()
  const expenses = await getAllExpenses(user.id)

  return (
    <div className='p-3'>
      <H3>Expenses</H3>
      <div className='container mx-auto py-10'>
        <DataTable columns={columns} data={expenses} />
      </div>
    </div>
  )
}

export default ExpensesPage
