import { createContext, useContext, useState } from 'react'

interface UIContextType {
  state: any
  show: (id: string, props?: any) => void
  hide: (id: string) => void
  toggleOverview: () => void
}

export const UIContext = createContext<UIContextType>({
  state: {},
  show: (id, props) => null,
  hide: (id) => null,
  toggleOverview: () => null,
})

type Props = { children: React.ReactNode }

const UIProvider = ({ children }: Props) => {
  const [state, setState] = useState({
    showOverview: true,
  })

  const show = (id: string, props: any) => {
    setState((prevState) => ({ ...prevState, [id]: { isVisible: true, props } }))
  }
  const hide = (id: string) => {
    setState((prevState) => ({ ...prevState, [id]: { isVisible: false } }))
  }
  const toggleOverview = () => {
    setState((prevState) => ({ ...prevState, showOverview: !prevState.showOverview }))
  }

  return (
    <UIContext.Provider value={{ state, show, hide, toggleOverview }}>
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider
export const useUI = () => useContext(UIContext)
