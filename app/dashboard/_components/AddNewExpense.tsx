'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import ExpenseForm from '../../../components/forms/expense-form'
import Modal from '@/components/Modal'
import { toast } from 'sonner'

const expense = {
  title: '',
  amount: 0,
  description: '',
  categoryName: '',
  monthlyDueDate: new Date(),
}

type Category = {
  id: string
  name: string
  userId?: string
  color?: string
  icon?: string
}

const AddNewExpense = ({ categories }: { categories: [Category] }) => {
  const [open, setOpen] = useState(false)

  const onSave = (data: any) => {
    console.log('Expense stored in DB', data)
    setOpen(false)
    toast(data.message, {
      description: `${data.response.title} | ${
        data.response.categoryName
      } | $${data.response.amount.toString()}`,
    })
  }

  return (
    <div>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button asChild>
          <Button variant={'outline'}>
            <PlusIcon /> Add expense
          </Button>
        </Modal.Button>
        <Modal.Content title='Create a new expense'>
          <div className='h-full overflow-y-scroll'>
          <ExpenseForm expense={expense} categories={categories} onSuccess={onSave} />
          </div>
          
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default AddNewExpense
