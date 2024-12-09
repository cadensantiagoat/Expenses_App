'use client'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface ToggleProps<TData> {
  table: Table<TData>
}

/*
    see if there is a better solution for this. 
    possibly include Header display name in TableData?
    reference: https://tanstack.com/table/v8/docs/guide/headers
*/
const tempHeader = [
  { id: 'title', name: 'Title' },
  { id: 'categoryName', name: 'Category' },
  { id: 'monthlyDueDate', name: 'Due' },
  { id: 'status', name: 'Status' },
  { id: 'amount', name: 'Amount' },
  { id: 'id', name: '' },
]

export function DataTableVisibilityToggle<TData>({ table }: ToggleProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 lg:flex'>
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>visible columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide() && column.id !== 'id' // added third condition so the 'action' column does not display in menu
          )
          .map((column, index) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {tempHeader[index].name}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
