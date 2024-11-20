'use client'

import { useModal, ModalIds } from '@/utils/contexts/modal-context'
import ExpenseForm from '@/components/forms/expense-form'
import Modal from '@/components/Modal'

const expense = {
    title: '',
    amount: '',
    description: '',
    categoryName: '',
    monthlyDueDate: new Date(),
  }

export const ExpenseFormModal = ({categories}) => {
    const { modals, openModal, closeModal } = useModal()

    const handleOpenChange = () => {
        closeModal(ModalIds.expenseModal);
        console.log(modals)
    }

    return (
        <Modal open={modals.expenseModal?.isOpen} onOpenChange={handleOpenChange}>
        <Modal.Content title='Create category'>
          {/* <AlertConfirmation
            open={showExitConfirmation}
            setOpen={setShowExitConfirmation}
            confirmationAction={handleConfirmAction}
            message='You have unsaved changes. Please confirm you want to exit without saving.'
          /> */}
          <ExpenseForm expense={expense} categories={categories} />
        </Modal.Content>
      </Modal>
    )
}