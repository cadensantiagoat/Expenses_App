'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import type { Expense } from '@/utils/schemas/Expense'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate, determineStatusByDate } from '@/utils/utils'
import { deleteTransaction } from '@/utils/actions'
import { ColumnHeader } from './column-header'
import {Chip} from '@/components/ui/chip'

/*
  need to access all categories and their icons and colors for display in table / chip
  solution: storing user's categories in object with each key being the categoryName
  example:
  {
    'Personal': { color: '#fff', icon: Angry },
    'Transportation': { color: '#fff', icon: Fuel },
  }

  OR (much better, simpler solution):
    query a user's expenses and categories together and pass category object
    to the entire row 

*/

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <ColumnHeader title='Title' column={column} />,
  },
  {
    accessorKey: 'categoryName',
    header: ({ column }) => <ColumnHeader title='Category' column={column} />,
    filterFn: 'arrIncludesSome',
    cell: ({ row }) => {
      const categoryData = row.original.category;
      return categoryData ? (
        <Chip title={categoryData.name} color={categoryData.color} iconName={categoryData.icon}/>
      ) : null
    }
  },
  {
    accessorKey: 'monthlyDueDate',
    header: ({ column }) => <ColumnHeader title='Due' column={column} />,
    cell: ({ row }) => formatDate(row.getValue('monthlyDueDate')),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <ColumnHeader title='Amount' column={column} align='right' />,
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
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader title='Status' align='center' column={column} />,
    cell: ({ row }) => <div className='text-center'>{determineStatusByDate(row.getValue('monthlyDueDate'))}</div>,
  },

  {
    accessorKey: 'id',
    header: () => null,
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
              <DropdownMenuItem
                onClick={() => {
                  deleteTransaction(expense.id)
                }}
              >
                Delete
              </DropdownMenuItem>
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
  const handleClick = (event) => {
    event.stopPropagation()
    router.push(path) 
  }
  return <DropdownMenuItem onClick={handleClick}>{children}</DropdownMenuItem>
}
