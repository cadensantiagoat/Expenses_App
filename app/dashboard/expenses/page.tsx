import { getAllExpenses } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { DataTable } from '@/components/table-data/data-table'
import { columns } from '@/components/table-data/columns'
import { getCategories } from '@/actions/categories'
import { Card } from '@/components/ui/card'
import { H4 } from '@/components/ui/typography'
import CategoryFormModal from '@/components/category-modal-form'


const ExpensesPage = async () => {
  const user = await getCurrentUser()
  const expenses = await getAllExpenses(user.id)
  const categories = await getCategories(user.id)

  return (
    // LAYOUT: wrapper div sets height and width to full grid.
    <div className='col-span-full h-full row-span-full'>
      <div className='grid h-full grid-rows-expensesLayout'>
        <Card className='p-3 h-full shadow-none'>
          <H4 className='pl-2'>overview / summary</H4>
        </Card>

        {/* Grid placement for Table is set in the component */}
        <DataTable columns={columns} data={expenses} categories={categories} />
        <CategoryFormModal />
      </div>
    </div>
  )
}

export default ExpensesPage