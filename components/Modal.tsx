import { ReactNode } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

const Modal = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  )
}

const ModalContent = ({
  title,
  children,
  onInteractOutside,
}: {
  title: string
  children: ReactNode
  onInteractOutside?: (e: Event) => void
}) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className='fixed inset-0 z-10 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />

      <DialogPrimitive.Content
        aria-describedby={undefined}
        onInteractOutside={onInteractOutside}
        className={
          'fixed left-[50%] top-[50%] z-20 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-3 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'
        }
      >
        <div className='modal-content-wrapper overflow-auto max-h-[900px] p-5'>
          <div className='flex items-center justify-between pb-5'>
            <DialogPrimitive.Title className='scroll-m-20 text-h4 font-medium tracking-tight'>
              {title}
            </DialogPrimitive.Title>

            <DialogPrimitive.Close className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
              <Cross2Icon className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </DialogPrimitive.Close>
          </div>
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

Modal.Button = DialogPrimitive.Trigger
Modal.Content = ModalContent
Modal.Close = DialogPrimitive.Close

export default Modal
