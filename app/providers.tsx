'use client'

import ModalProvider from '@/utils/contexts/modal-context'
import UIProvider from '@/utils/contexts/ui-context'
import { ClerkProvider } from '@clerk/nextjs'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <UIProvider>
        <ModalProvider>{children}</ModalProvider>
      </UIProvider>
    </ClerkProvider>
  )
}
