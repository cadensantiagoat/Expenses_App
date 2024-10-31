import { getAllExpenses } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { H3 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/table/data-table'
import { columns } from '@/components/table/columns'
import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const ExpensesPage = async () => {
  const user = await getCurrentUser()
  const expenses = await getAllExpenses(user.id)

  return (
    <div className='p-3'>
      <div className='flex justify-between items-center pb-3'>
        <H3>Expenses</H3>
        <Link href={`/dashboard/expenses/add`}>
          <Button variant={'outline'}>
            <PlusIcon />
            Add expense
          </Button>
        </Link>
      </div>

      <div className='container mx-auto py-6'>
        <DataTable columns={columns} data={expenses} />
      </div>
    </div>
  )
}

export default ExpensesPage
