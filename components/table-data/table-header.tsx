'use client'

import { useState } from 'react'
import { Input } from '../ui/input'
import { H4 } from '../ui/typography'
import { IconButton } from '../ui/button'
import {CategoryFilter} from './category-filter'
import { useModal, ModalIds } from '@/utils/contexts/modal-context'
import { DataTableVisibilityToggle } from './column-visibility-toggle'
import type { Category } from '@/utils/schemas/Category'

type TableHeaderProps = {
  table: Object
  categories: Category[]
}

export const TableHeaderButtons = ({ table, categories }: TableHeaderProps) => {
  const [showFilters, setShowFilters] = useState(true)
  const { modals, openModal, closeModal } = useModal()

  const handleNewCategoryClicked = () => {
    openModal(ModalIds.categoryModal)
  }
  const handleNewExpenseClicked = () => {
    // setModalOpen(true)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex py-5 justify-between'>
        <H4 className='pl-2'>expenses</H4>
        <div className='flex gap-3'>
          <IconButton
            iconName='Plus'
            text='New Category'
            size={'sm'}
            variant={'outline'}
            onClick={handleNewCategoryClicked}
          />
          <IconButton
            iconName='Plus'
            text='New Expense'
            size={'sm'}
            onClick={handleNewExpenseClicked}
          />
        </div>
      </div>
      <div className='border-b mb-3' />
      <div className='flex gap-3 pb-3 justify-between items-center w-full'>
        <div className='flex gap-3 w-full'>
          {showFilters && (
            <>
              <Input
                placeholder='Search...'
                value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
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
