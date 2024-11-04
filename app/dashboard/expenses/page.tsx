import { getAllExpenses } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/table-data/data-table'
import { columns } from '@/components/table-data/columns'
import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { getCategories } from '@/actions/categories'
import CreateCategory from '../_components/CreateCategory'
import { Card } from '@/components/ui/card'

const ExpensesPage = async () => {
  const user = await getCurrentUser()
  const expenses = await getAllExpenses(user.id)
  const categories = await getCategories(user.id)

  return (
    <div className='w-full h-full flex flex-col gap-3'>

      <Card className='p-3 shadow-none h-full max-h-[270px]'>
          <div className='flex gap-2 items-center'>
            <Link href={`/dashboard/expenses/add`}>
              <Button variant={'outline'}>
                <PlusIcon />
                Add expense
              </Button>
            </Link>
            <CreateCategory />
          </div>
      </Card>

      <div className=''>
        <DataTable columns={columns} data={expenses} categories={categories} />
      </div>
    </div>
  )
}

export default ExpensesPage
