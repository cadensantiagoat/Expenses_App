import TopNav from './app-topnav'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { CircleDollarSign, HouseIcon } from 'lucide-react'

const iconStyle = ''

const navLinks = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: <HouseIcon className={iconStyle} />
  },
  {
    title: 'Expenses',
    url: '/dashboard/expenses',
  },
  {
    title: 'Categories',
    url: '/dashboard/expenses/categories/add',
  },
]

const Shell = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <aside>
        <AppSidebar navLinks={navLinks} />
      </aside>

      <main className='w-full'>
        <TopNav navLinks={navLinks} />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default Shell
