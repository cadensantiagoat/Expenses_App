'use client'

import ModalProvider from '@/utils/contexts/modal-context'
import { ClerkProvider } from '@clerk/nextjs'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </ModalProvider>
  )
}
