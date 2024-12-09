import TopNav from './app-topnav'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'
import Icon from '../Icon'


const navLinks = [
  {
    title: 'Expenses',
    url: '/expenses',
    icon: <Icon name='HandCoins' />
  },
  {
    title: 'Categories',
    url: '/expenses/categories',
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
