'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AlertConfirmation } from './AlertConfirmation'

type props = {
  title: string
  description: string
  buttonText?: string
  children: any
  open: boolean
  onOpenChange: any
}

// DialogModal is OPEN BY DEFAULT (needs to be renamed)
export const DialogModal = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  const router = useRouter()

  const handleOpenChange = () => {
    router.back()
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className='overflow-y-hidden'>
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export const ModalWithConfirmation = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false)
  const router = useRouter()

  const closeModal = () => {
    router.back()
  }

  const handleOpenChange = () => {
    const isExpenseFormModified = localStorage.getItem('expense-form-modified')

    if (isExpenseFormModified && JSON.parse(isExpenseFormModified)) {
      setShowExitConfirmation(true)
    } else router.back()
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className='overflow-y-hidden'>
        <DialogTitle>{title}</DialogTitle>
        <AlertConfirmation
          open={showExitConfirmation}
          setOpen={setShowExitConfirmation}
          confirmationAction={closeModal}
          message='You have unsaved changes. Please confirm you want to exit without saving.'
        />
        {children}
      </DialogContent>
    </Dialog>
  )
}

type modalProps = {
  title: string
  description: string
  children: any
  open?: boolean
  onOpenChange?: any
}

export function Modal({
  title,
  description,
  open = true,
  onOpenChange,
  children,
}: modalProps) {
  return (
    <Dialog open={open} modal defaultOpen onOpenChange={onOpenChange}>
      <DialogContent forceMount className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
