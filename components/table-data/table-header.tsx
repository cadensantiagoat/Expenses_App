'use client'

import { useState } from 'react'
import { Input } from '../ui/input'
import { CategoryFilter } from './category-filter'
import { useModal, ModalIds } from '@/utils/contexts/modal-context'
import { DataTableVisibilityToggle } from './column-visibility-toggle'
import type { Category } from '@/utils/schemas/Category'

type Props = {
  table: Object
  categories: Category[]
}

export const TableFilterControls = ({ table, categories }: Props) => {
  const [showFilters, setShowFilters] = useState(true)
  const { modals, openModal, closeModal } = useModal()

  const handleNewCategoryClicked = () => {
    openModal(ModalIds.categoryModal)
  }
  const handleNewExpenseClicked = () => {
    // setModalOpen(true)
  }

  return (
    <div className='flex items-center w-full justify-between gap-2 py-3'>
      <div className="flex w-full">
      <Input
        placeholder='Search...'
        value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
        className='max-w-[240px] h-[32px]'
      />
      </div>
      <div className="flex gap-2">
      <CategoryFilter categories={categories} table={table} />
      <DataTableVisibilityToggle table={table} />
      </div>
      {/* <div className='flex self-end'> */}
      {/* <IconButton
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
      /> */}
    </div>
  )
}
