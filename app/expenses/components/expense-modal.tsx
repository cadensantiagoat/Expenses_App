'use client'

import { useState } from 'react'
import { AlertConfirmation } from '@/components/AlertConfirmation'
import { useModal, ModalIds } from '@/utils/contexts/modal-context'
import ExpenseForm from '@/components/forms/expense-form'
import { IS_EXPENSE_FORM_DIRTY } from '@/utils/constants'
import type { Category } from '@/utils/schemas/Category'
import Modal from '@/components/Modal'
import { toast } from 'sonner'

interface Props {
  categories: Category[]
}

export const ExpenseFormModal = ({ categories }: Props) => {
  const { modals, closeModal } = useModal()
  const [showExitConfirmation, setShowExitConfirmation] = useState(false)

  /* checks if form has been modified before closing modal */
  const handleOpenChange = () => {
    const isFormModified = localStorage.getItem(IS_EXPENSE_FORM_DIRTY)
    if (isFormModified && JSON.parse(isFormModified)) setShowExitConfirmation(true)
    else closeModal(ModalIds.expenseModal)
  }

  /* runs when form submits successfully */
  const onSuccess = ({ message }: { message: string; }) => {
    closeModal(ModalIds.expenseModal)
    toast.success(message)
  }

  /* click handler for the AlertConfirmation   */
  const handleConfirmAction = () => closeModal(ModalIds.expenseModal)

  /* set default values for the expense form. */
  const expense = modals.expenseModal?.props
    ? modals.expenseModal?.props
    : {
        title: '',
        amount: '',
        description: '',
        autopayEnabled: true,
        categoryId: '',
        frequency: 'Monthly',
        monthlyDueDate: new Date(),
      }

  return (
    <Modal open={modals.expenseModal?.isOpen} onOpenChange={handleOpenChange}>
      <Modal.Content title='Create Expense'>
        <AlertConfirmation
          open={showExitConfirmation}
          setOpen={setShowExitConfirmation}
          confirmationAction={handleConfirmAction}
          message='You have unsaved changes. Please confirm you want to exit without saving.'
        />
        <ExpenseForm expense={expense} categories={categories} onSuccess={onSuccess} />
      </Modal.Content>
    </Modal>
  )
}
