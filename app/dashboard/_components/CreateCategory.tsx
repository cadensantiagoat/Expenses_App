'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

import Modal from '@/components/Modal'
import CategoryForm from '@/components/forms/category-form'

const CreateCategory = () => {
  const [open, setOpen] = useState(false)

  const onSave = (data: any) => {
    console.log('Expense stored in DB', data)
    setOpen(false)
  }

  return (
    <div>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button asChild>
          <Button variant={'outline'}>
            <PlusIcon /> <span className='pl-1'>New Category</span>
          </Button>
        </Modal.Button>
        <Modal.Content title='Category'>
          <CategoryForm onSave={onSave} />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default CreateCategory
