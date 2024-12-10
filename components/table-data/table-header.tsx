'use client'

import { Input } from '../ui/input'
import { DataTableVisibilityToggle } from './column-visibility-toggle'
import type { Category } from '@/utils/schemas/Category'

type Props = {
  table: Object
  categories: Category[]
}

export const TableFilterControls = ({ table, categories }: Props) => {
  return (
    <div className='flex items-center w-full justify-between gap-2 py-3'>
      <div className='flex w-full'>
        <Input
          placeholder='Search...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className='max-w-[240px] h-[32px]'
        />
      </div>
      <div className='flex gap-2'>
        <DataTableVisibilityToggle table={table} />
      </div>
    </div>
  )
}
