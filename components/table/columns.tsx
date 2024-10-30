'use client'

import { useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import type { Expense } from '@/utils/schemas/Expense'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'categoryName',
    header: 'Category',
  },
  {
    accessorKey: 'monthlyDueDate',
    header: 'Due',
  },
  {
    accessorKey: 'autopayEnabled',
    header: 'Autopay',
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div className='text-right'>{formatted}</div>
    },
  },
  {
    accessorKey: 'id',
    header: () => <div className='text-center'>Action</div>,
    cell: ({ row }) => {
      const expense = row.original // access expense data using row.original

      return (
        <div className='text-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <LinkButton path={`/dashboard/expenses/${expense.id}`}>
                View expense
              </LinkButton>

              <DropdownMenuSeparator />
              <LinkButton path={`/dashboard/expenses/edit/${expense.id}`}>
                Edit
              </LinkButton>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

type LinkButtonProps = {
  path: string
  children: string
}

const LinkButton = ({ path, children }: LinkButtonProps) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(path)
  }

  return <DropdownMenuItem onClick={handleClick}>{children}</DropdownMenuItem>
}
