import { createContext, useState } from 'react'

interface ModalContextType {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
}

export const ModalContext = createContext<ModalContextType>({
  modalOpen: false,
  setModalOpen: () => {},
})

type Props = { children: React.ReactNode }

const ModalProvider = ({ children }: Props) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
