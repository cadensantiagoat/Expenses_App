'use client'

import { DataTableVisibilityToggle } from './column-visibility-toggle'
import { IconButton } from '../ui/button'
import { H4 } from '../ui/typography'
import { Input } from '../ui/input'
import CategoryFilter from './category-filter'
import { useState } from 'react'

export const TableHeaderButtons = ({ table, categories }) => {
  const [showFilters, setShowFilters] = useState(true)
  return (
    <div className='flex flex-col'>
      <div className='flex py-5 justify-between'>
        <H4 className='pl-2'>expenses</H4>
        <div className='flex gap-3'>
          <IconButton iconName='Plus' text='New Category' size={'sm'} variant={'outline'} />
          <IconButton iconName='Plus' text='New Expense' size={'sm'} />
        </div>
      </div>
      <div className='border-b mb-3'></div>
      <div className='flex gap-3 pb-3 justify-between items-center w-full'>
        <div className='flex gap-3 w-full'>
          {showFilters && (
            <>
              <Input
                placeholder='Search...'
                value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('title')?.setFilterValue(event.target.value)
                }
                className='max-w-[240px] h-[32px]'
              />
              <CategoryFilter categories={categories} table={table} />
            </>
          )}
        </div>
        <div className='flex gap-3'>
          <IconButton
            iconName={showFilters ? `FilterX` : `Filter`}
            variant={'outline'}
            text={`Filters`}
            size={'sm'}
            onClick={() => setShowFilters(!showFilters)}
          />
          <DataTableVisibilityToggle table={table} />
        </div>
      </div>
    </div>
  )
}
