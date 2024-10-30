// 'use client' is not required for parallel routes to work.
// Made this a client component so we can use usePathname() hook
'use client'

import Shell from '@/components/shell/Shell'
import { usePathname } from 'next/navigation'

type Props = {
  children: React.ReactNode
  expenses: React.ReactNode
  summary: React.ReactNode
  modal: React.ReactNode
}

const DashboardLayout = ({ children, expenses, summary, modal }: Props) => {
  const path = usePathname() // string that returns the current route
  return (
    <Shell>
      {path === '/dashboard' ? (
        <div className='grid h-full grid-cols-5 grid-rows-6 gap-3 p-3'>
          {modal}
          <div className='col-span-5'>{summary}</div>
          {/* <div className='col-span-2 row-span-2'>{expenses}</div> */}
          <div className='col-span-5 pt-12'>{children}</div>
        </div>
      ) : (
        <div>
          {modal}
          {children}
        </div>
      )}
    </Shell>
  )
}

export default DashboardLayout
