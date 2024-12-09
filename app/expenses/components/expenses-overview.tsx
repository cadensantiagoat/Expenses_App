'use client'

import { useEffect, useState } from 'react'
import { H4, Small, Muted } from '@/components/ui/typography'
import ProgressBar from '@/components/progress-bar'
import { formatCurrency } from '@/utils/utils'
import { Card } from '@/components/ui/card'
import { useUI } from '@/utils/contexts/ui-context'

interface Props {
  expenses: any
  total: number
}

export const ExpensesOverview = ({ expenses, total }: Props) => {
  const [amountDue, setAmountDue] = useState(0)
  const { state } = useUI()

  useEffect(() => {
    const amountPaid = expenses
      // Filters out expenses that have not been paid (where dueDay is greater than todays date).
      .filter((expense: any) => expense.dueDay <= new Date().getDate())
      // Computes the sum of paid expenses
      .reduce(
        (accumulator: number, currentValue: any) => accumulator + parseFloat(currentValue.amount),
        0
      )
      .toFixed(2)

    setAmountDue(total - amountPaid)
  }, [expenses, total])

  return state.showOverview && (

    <Card className='flex w-full gap-3 items-center min-h-[150px] shadow-none rounded-lg'>
      <div className='flex flex-col gap-3 py-6 pr-3 pl-6 flex-auto'>
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
          <ProgressBar value={(1 - amountDue / total) * 100} className='' />
          <Muted>{((1 - amountDue / total) * 100).toFixed(0)}%</Muted>
        </div>
      </div>
    </Card>

  )
}
