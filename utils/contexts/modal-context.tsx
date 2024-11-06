import { createContext, useContext, useState } from 'react'

export enum ModalIds {
  categoryModal = 'categoryModal',
  expenseModal = 'expenseModal'
}

interface ModalContextType {
  modals: any
  openModal: (modalId: ModalIds, props?: any) => void
  closeModal: (modalId: ModalIds) => void
}

export const ModalContext = createContext<ModalContextType>({
  modals: {},
  openModal: () => null,
  closeModal: (modalId: ModalIds) => null
})

type Props = { children: React.ReactNode }

const ModalProvider = ({ children }: Props) => {
  const [modals, setModals] = useState({})

  const openModal = (modalId: ModalIds, props: any) => {
    setModals((prevModals) => ({...prevModals, [modalId]: {isOpen: true, props}}))
  }

  const closeModal = (modalId: ModalIds) => {
    setModals((prevModals) => ({ ...prevModals, [modalId]: { isOpen: false } }));
  }

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
export const useModal = () => useContext(ModalContext)
