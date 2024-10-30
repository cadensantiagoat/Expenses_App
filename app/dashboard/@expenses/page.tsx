import { getAllExpenses } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import Link from 'next/link'
import { formatDate } from '@/utils/utils'
import { Muted, Small } from '@/components/ui/typography'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const ExpensesSlot = async () => {
  const user = await getCurrentUser()
  const data = await getAllExpenses(user.id)

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Upcoming</CardTitle>
        <CardDescription>List of next expenses about to be paid</CardDescription>
      </CardHeader>
      <CardContent className='overflow-y-auto'>
        {data.map((item, index) => {
          return index < 5 ? (
            <ExpenseRowSmall
              key={item.id}
              title={item.title}
              amount={item.amount}
              due={item.monthlyDueDate}
            />
          ) : null
        })}
      </CardContent>
      <CardFooter />
    </Card>
  )
}

const ExpenseRowSmall = ({ title, amount, due }) => {
  return (
    <div className='py-2 px-3 mb-2 border-b border-foreground/30'>
      <div className='grid grid-cols-3 items-center'>
        <Small>{title}</Small>
        <Muted>${amount.toString()}</Muted>
        <Muted>{formatDate(due)}</Muted>
      </div>
    </div>
  )
}

export default ExpensesSlot
