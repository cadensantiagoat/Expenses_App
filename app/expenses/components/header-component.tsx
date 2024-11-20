'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { usePathname } from 'next/navigation'
import { IconButton } from '@/components/ui/button'
import { H2, Small, Muted } from '@/components/ui/typography'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useModal, ModalIds } from '@/utils/contexts/modal-context'

type Props = { children: React.ReactNode }

export const Header = ({ children }: Props) => {
  const path = usePathname()
  const { modals, openModal, closeModal } = useModal()
  const [showOverview, setShowOverview] = useState(true)

  const handleNewCategoryClicked = () => {
    openModal(ModalIds.categoryModal)
  }

  /*
     TO-DO: Implement Expense form using modal context to control the modal.
            It is currently controlled via routing / pathname.
  */
  const handleNewExpenseClicked = () => {
    // setModalOpen(true)
  }

  return (
    <>
      <div className='flex flex-col gap-2 pt-8 pb-4'>
        <H2 className='border-0'>{path === '/expenses' ? 'Expenses' : 'Categories'}</H2>
        <div className='flex justify-between items-center w-full'>
          <Muted>{format(new Date(), 'MMMM do, yyyy')}</Muted>
          <IconButton
          iconName={showOverview ? 'ChevronUp' : 'ChevronDown'}
          text={`${showOverview ? 'Hide' : 'Show'} data`}
          variant={'ghost'}
          onClick={() => setShowOverview(!showOverview)}
          />
        </div>
      </div>
      {showOverview && children}
      <Tabs defaultValue='manage' className='w-full py-4'>
        <div className='flex items-center justify-between'>
          <TabsList>
            <Link href={`/expenses`}>
              <TabsTrigger value='manage'>Manage</TabsTrigger>
            </Link>
            <Link href={`/expenses/categories`}>
              <TabsTrigger value='categories'>Categories</TabsTrigger>
            </Link>
          </TabsList>
<div className="flex items-center gap-2">
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
            // onClick={() => console.log('new expense')}
          />
          </div>
        </div>
      </Tabs>
    </>
  )
}