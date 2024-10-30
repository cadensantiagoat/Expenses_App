import { getExpenseDataForDashboard } from '@/actions/expenses'
import { getCurrentUser } from '@/utils/auth'
import { groupExpensesByCategory } from '@/actions/categories'
import { H4, Small, Blockquote, Muted } from '@/components/ui/typography'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// need to rename this component

const ProgressSlot = async () => {
  const user = await getCurrentUser()
  const { total, count } = await getExpenseDataForDashboard(user.id)
  const groups = await groupExpensesByCategory()

  const totalCount = groups.reduce((acc, curr) => acc + curr._count, 0)

  return (
    <Card className='h-full overflow-y-auto'>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
      </CardHeader>
      <CardContent className=''>
        <div className='flex flex-col-reverse pt-3'>
          {groups.map((category) => (
            <CategoryCardSmall
              key={category.categoryName}
              name={category.categoryName}
              count={category._count}
              total={category._sum.amount}
            />
          ))}
          <CategoryCardSmall key={'all'} name={'All'} count={totalCount} total={total} />
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default ProgressSlot

const CategoryCardSmall = ({ name, count, total }) => {
  return name === '' ? (
    <div className='pt-2 px-3'>
      <Muted>
        You have {count} uncategorized expense{count > 1 && 's'}.
      </Muted>
    </div>
  ) : (
    <div className='flex w-full border-b pb-3'>
      <div className='flex-initial w-[50%]'>
        <Muted>category</Muted>
        <Small>{name}</Small>
      </div>
      <div className='w-[25%] md:visible sm:invisible'>
        <Muted>items</Muted>
        <Small>{count}</Small>
      </div>
      <div className='md:w-[25%] sm:w-1/2'>
        <Muted>total</Muted>
        <Small>${total.toString()}</Small>
      </div>
    </div>
  )
}
