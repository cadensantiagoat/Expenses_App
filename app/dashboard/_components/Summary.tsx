'use client'

import type { Category } from '@/utils/schemas/Category'
import ProgressBar from './progress-bar'
import { H2 } from '@/components/ui/typography'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  categories: Category[]
  totalAmount: number
  amountPaid: number
}

const Summary = ({ categories, totalAmount, amountPaid }: Props) => {
  const paidProgress = (amountPaid / totalAmount) * 100

  return (
    <div className='p-3'>
      <div className='pb-3'>
        <H2 className='border-none'>Summary</H2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[22%]'>expenses</TableHead>
            <TableHead className='w-[18%]'>paid</TableHead>
            <TableHead className='w-[18%]'>due</TableHead>
            <TableHead className='w-[42%]'>progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className='h-14 data-[state=open]:bg-slate-100'>
            <TableCell className='font-medium text-lg'>${totalAmount}</TableCell>
            <TableCell className='text-base text-green-700'>
              ${amountPaid.toFixed(2)}
            </TableCell>
            <TableCell className='text-base text-red-700'>
              ${(totalAmount - amountPaid).toFixed(2)}
            </TableCell>
            <TableCell className='align-middle'>
              <ProgressBar value={paidProgress} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div></div>
    </div>
  )
}

export default Summary
