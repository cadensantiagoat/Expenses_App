'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { formatDate, determineStatusByDate } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import type { Expense } from '@/utils/types'

export function ExpenseTable({ data, total = 0 }: any) {
  return (
    data && (
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[210px]'>Expense</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((expense: Expense) => (
            <ExpenseRow key={expense.id} expense={expense} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className='text-right'>${total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  )
}

const ExpenseRow = ({ expense }: { expense: Expense }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/dashboard/expenses/edit/${expense.id}`)
  }

  return (
    <TableRow onClick={handleClick}>
      <TableCell className='font-medium'>{expense.title}</TableCell>
      <TableCell>{expense.categoryName}</TableCell>
      <TableCell>{formatDate(expense.monthlyDueDate)}</TableCell>
      <TableCell>{determineStatusByDate(expense.monthlyDueDate)}</TableCell>
      <TableCell className='text-right'>${expense.amount}</TableCell>
    </TableRow>
  )
}
