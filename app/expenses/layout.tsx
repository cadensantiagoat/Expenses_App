import React from 'react'
import Shell from '@/components/shell/Shell'
import { format } from 'date-fns'
import { H2, Small, Muted } from '@/components/ui/typography'

type Props = {
  children: React.ReactNode
  overview: React.ReactNode
}

const ExpensesLayout = ({ children, overview }: Props) => {
  return (
    <Shell>
      <div className='col-span-full h-full row-span-full px-3'>
        <ExpensesHeader />
        {overview}
        {children}
      </div>
    </Shell>
  )
}

export default ExpensesLayout

const ExpensesHeader = () => {
  return (
    <div className='flex flex-col gap-2 pt-8 pb-6'>
      <H2 className='border-0'>Expenses</H2>
      <div className='flex justify-between items-center w-full'>
        <Muted>{format(new Date(), 'MMMM do, yyyy')}</Muted>
        <Small>Hide Data</Small>
      </div>
    </div>
  )
}
