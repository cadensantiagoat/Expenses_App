import { getCurrentUser } from '@/utils/auth'
import { groupExpensesByCategory } from '@/actions/categories'
import { getExpenseDataForDashboard } from '@/actions/expenses'
import { randomNumber } from '@/utils/utils'
import Summary from '../_components/Summary'

const SummarySlot = async () => {
  const user = await getCurrentUser()
  const { total, count } = await getExpenseDataForDashboard(user.id)
  const groups = await groupExpensesByCategory()

  // temporary solution. Need to compute these fields using the DB.
  const totalCount = groups.reduce((acc, curr) => acc + curr._count, 0)
  const randomAmountPaid = randomNumber(total)

  return <Summary categories={groups} totalAmount={total} amountPaid={randomAmountPaid} />
}

export default SummarySlot
