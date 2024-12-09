'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import Modal from '@/components/Modal'
import type { Category } from '@/utils/schemas/Category'
import { IS_CATEGORY_FORM_DIRTY } from '@/utils/constants'
import CategoryForm from '@/components/forms/category-form'
import { useModal, ModalIds } from '@/utils/contexts/modal-context'
import { AlertConfirmation } from '../../../components/AlertConfirmation'

const defaultCategory = {
  name: '',
  color: '',
  icon: '',
}

type CategoryFormModalProps = {
  initialCategory?: Category
}

const CategoryFormModal = ({ initialCategory = defaultCategory }: CategoryFormModalProps) => {
  const { modals, closeModal } = useModal()
  const [showExitConfirmation, setShowExitConfirmation] = useState(false)

  const handleOpenChange = () => {
    const isFormModified = localStorage.getItem(IS_CATEGORY_FORM_DIRTY)
    /* Checks if 'name' field has been modified before closing the modal. */
    if (isFormModified && JSON.parse(isFormModified)) setShowExitConfirmation(true)
    else closeModal(ModalIds.categoryModal)
  }

  /* click handler for the AlertConfirmation   */
  const handleConfirmAction = () => closeModal(ModalIds.categoryModal)

  const onSuccess = ({ message }: { message: string }) => {
    closeModal(ModalIds.categoryModal)
    toast.success(message)
  }

  return (
    <Modal open={modals.categoryModal?.isOpen} onOpenChange={handleOpenChange}>
      <Modal.Content title='Create category'>
        <AlertConfirmation
          open={showExitConfirmation}
          setOpen={setShowExitConfirmation}
          confirmationAction={handleConfirmAction}
          message='You have unsaved changes. Please confirm you want to exit without saving.'
        />
        <CategoryForm
          category={modals.categoryModal?.props ? modals.categoryModal?.props : initialCategory}
          onSuccess={onSuccess}
        />
      </Modal.Content>
    </Modal>
  )
}

export default CategoryFormModal
