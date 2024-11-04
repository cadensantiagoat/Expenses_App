'use client'

import { useState, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

import Modal from '@/components/Modal'
import CategoryForm from '@/components/forms/category-form'
import { ModalContext } from '@/utils/contexts/modal-context'

const defaultCategory = {
  name: '',
  // color: '',
  // icon: '',
}

const CreateCategory = () => {
  const [open, setOpen] = useState(false)
  const { modalOpen, setModalOpen } = useContext(ModalContext)

  const onSave = (data: any) => {
    console.log('Category stored to DB', data)
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
        <Modal.Content title='New category'>
          <CategoryForm onSuccess={onSave} category={defaultCategory} />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default CreateCategory
