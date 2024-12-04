'use client'

import { useEffect, useState } from 'react'
import { H4, Small, Muted } from '@/components/ui/typography'
import ProgressBar from '../../dashboard/components/progress-bar'
import { formatCurrency } from '@/utils/utils'

// DEFINE INTERFACE

export const ExpensesOverview = ({ total, data }) => {
  const [amountDue, setAmountDue] = useState(0)

  useEffect(() => {
    const amountPaid = data.transactions
      // Filters out expenses that have not been paid (where dueDay is greater than todays date).
      .filter((expense: any) => expense.dueDay <= new Date().getDate())
      // Computes the sum of paid expenses
      .reduce(
        (accumulator: number, currentValue: any) => accumulator + parseFloat(currentValue.amount),
        0
      )
      .toFixed(2)

    setAmountDue(total - amountPaid)
  }, [data, total])

  return (
    <div className='flex w-full gap-3 items-center border-b border-t'>
      <div className='flex flex-col gap-3 py-6 pr-3 flex-auto'>
        <Small className='font-normal'>Total due each month</Small>
        <H4 className=''>{formatCurrency(total)}</H4>
      </div>
      <div className='shrink-0 bg-border w-[1px] h-[75%]' />
      <div className='flex flex-col gap-3 py-6 px-3 flex-auto'>
        <Small className='font-normal'>Due this month</Small>
        <H4 className='text-red-700'>{formatCurrency(amountDue)}</H4>
      </div>
      <div className='shrink-0 bg-border w-[1px] h-[75%]' />
      <div className='flex flex-col gap-3 py-6 px-3 flex-auto'>
        <Small className='font-normal'>Progress</Small>
        <div className='progress-wrapper h-[28px] min-w-[150px] flex items-center gap-2'>
          <ProgressBar value={(1 - amountDue/total) * 100} className='' />
          <Muted>{((1 - amountDue/total) * 100).toFixed(0)}%</Muted>
        </div>
      </div>
    </div>
  )
}
