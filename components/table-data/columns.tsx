'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import type { Expense } from '@/utils/schemas/Expense'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/utils'
import { deleteExpense } from '@/actions/expenses'
import { ColumnHeader } from './column-header'
import { Chip } from '@/components/ui/chip'
import { updateMonthToCurrent } from '@/utils/utils'
import { formatCurrency } from '@/utils/utils'
import { StatusChip } from './status-chip'

// TO-DO: Implement Toast message on Delete success

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <ColumnHeader title='Title' column={column} />,
  },
  {
    accessorKey: 'category.name',
    header: ({ column }) => <ColumnHeader title='Category' column={column} />,
    filterFn: 'arrIncludesSome',
    cell: ({ row }) => {
      const categoryData = row.original.category
      return categoryData ? (
        <Chip title={categoryData.name} color={categoryData.color} iconName={categoryData.icon} />
      ) : null
    },
  },
  {
    accessorKey: 'monthlyDueDate',
    header: ({ column }) => <ColumnHeader title='Due' column={column} />,
    cell: ({ row }) => {
      const dueDate = row.getValue('monthlyDueDate')

      if (row.original.frequency === 'Monthly') {
        const updatedDate = updateMonthToCurrent(dueDate)
        return formatDate(updatedDate)
      }
      return formatDate(row.getValue('monthlyDueDate'))
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <ColumnHeader title='Amount' column={column} align='right' />,
    cell: ({ row }) => {
      const formattedAmount = formatCurrency(parseFloat(row.getValue('amount')))
      return <div className='text-right'>{formattedAmount}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader title='Status' align='center' column={column} />,
    cell: ({ row }) => {
      const status = row.original.dueDay <= new Date().getDate()

      return (
        <div className='text-center'>
          <StatusChip status={status} />
        </div>
      )
    },
  },

  {
    accessorKey: 'id',
    header: () => null,
    cell: ({ row }) => {
      const { id } = row.original // access expense data using row.original

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

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(event) => {
                  event.stopPropagation()
                   deleteExpense(id) 
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
