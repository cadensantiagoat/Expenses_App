import TopNav from './app-topnav'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'
import Icon from '../Icon'


const navLinks = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: <Icon name='House' />
  },
  {
    title: 'Expenses',
    url: '/dashboard/expenses',
    icon: <Icon name='HandCoins' />
  },
  {
    title: 'Categories',
    url: '/dashboard/expenses/categories/add',
    icon: <Icon name='Layers' />
  },
]

const Shell = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <SidebarProvider>
      <aside>
        <AppSidebar navLinks={navLinks} />
      </aside>

      <main className='h-screen w-full p-2'>
        <TopNav navLinks={navLinks} />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default Shell
