'use client'

import React from 'react'
import { format } from 'date-fns'
import { usePathname } from 'next/navigation'
import { IconButton } from '@/components/ui/button'
import { useUI } from '@/utils/contexts/ui-context'
import { H2, Muted } from '@/components/ui/typography'
import { useModal, ModalIds } from '@/utils/contexts/modal-context'

export const Header = () => {
  const path = usePathname()
  const { state, toggleOverview } = useUI()

  return (
    <>
      <div className='flex justify-between items-center w-full'>
        <div className='flex flex-col pt-8 pb-4'>
          <H2 className='border-0'>{path === '/expenses' ? 'Expenses' : 'Categories'}</H2>
          <Muted className='pl-[0.12rem]'>{format(new Date(), 'MMMM do, yyyy')}</Muted>
        </div>
      </div>

        <div className='flex items-center justify-between'>
          <ActionButtons />
          <IconButton
            iconName={state.showOverview ? 'ChevronUp' : 'ChevronDown'}
            text={`${state.showOverview ? 'Hide' : 'Show'} data`}
            variant={'ghost'}
            onClick={toggleOverview}
          />
        </div>
    </>
  )
}

const ActionButtons = () => {
  const { openModal } = useModal()

  const handleNewCategoryClicked = () => {
    openModal(ModalIds.categoryModal)
  }

  const handleNewExpenseClicked = () => {
    openModal(ModalIds.expenseModal)
  }
  return (
    <div className='flex items-center justify-end py-3 gap-2'>
      <IconButton
        iconName='Plus'
        text='New Expense'
        size={'sm'}
        onClick={handleNewExpenseClicked}
      />
      <IconButton
        iconName='Plus'
        text='New Category'
        size={'sm'}
        variant={'outline'}
        onClick={handleNewCategoryClicked}
      />
    </div>
  )
}
