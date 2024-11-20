'use client'
import { H1, H2, H3, H4, Small, Muted, Large, P } from '@/components/ui/typography'
import ProgressBar from '../../dashboard/components/progress-bar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const ExpensesOverview = () => {
  return (
    <Card className='px-6 w-full'>
      <div className='flex items-center gap-4 border-b pt-6 pb-4'>
        <Muted className=''>total</Muted>
        <Large className=''>$3,432.96</Large>
      </div>
      <div className='flex flex-col pb-8'>
        <div className='flex items-center gap-4 pt-4'>
          <Muted className=''>paid</Muted>
          <Small className=''>$1,432.96</Small>
        </div>
        <div className='flex items-center gap-4 pt-4'>
          <Muted className=''>due</Muted>
          <Small className=''>$2,432.96</Small>
        </div>
        <div className='pt-6 max-w-[420px]'>
          <div className='flex items-center gap-3'>
            <ProgressBar value={42} className='' />
            <Muted className=''>42%</Muted>
          </div>
        </div>
      </div>
    </Card>
  )
}
