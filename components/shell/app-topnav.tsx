'use client'

import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs'
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { Small } from '../ui/typography'

type Props = {
  navLinks: { title: string; url: string }[]
}

const TopNav = ({ navLinks }: Props) => {
  const { open } = useSidebar()
  const path = usePathname()

  return (
    <header>
    {/* <header className={`py-2 ${open ? 'pr-2' : 'px-2'}`}> */}
      <div className='h-16 flex justify-between items-center p-2 gap-2 bg-sidebar rounded-lg border border-sidebar-border'>
        <div className='flex items-center gap-2'>
          <SidebarTrigger />
          <div className='shrink-0 bg-border w-[1px] h-4' />
          <div className='pl-2'>
            {navLinks
              .filter((link) => link.url === path)
              .map((link) => <Small key={link.url}>{link.title}</Small>)}
          </div>
        </div>
        <div className='flex items-center'>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

export default TopNav
