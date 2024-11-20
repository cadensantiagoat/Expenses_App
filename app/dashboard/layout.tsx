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
      <div className={`h-[calc(100%-64px)] pt-2 grid grid-cols-5 grid-rows-8 gap-3 overflow-auto`}>
        {path === '/dashboard' ? (
          <>
            {modal}
            <div className='col-span-5'>{summary}</div>
            <div className='col-span-5 row-start-3'>{children}</div>
          </>
        ) : (
          <>
            {/* {modal} */}
            {children}
          </>
        )}
      </div>
    </Shell>
  )
}

export default DashboardLayout
