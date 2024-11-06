'use client'

import * as React from 'react'
import { CircleDollarSign } from 'lucide-react'
import { H4 } from '../ui/typography'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const isActive = (path: string, url: string) => {
  return path === url
}

/*
  Good example of using ComponentProps with custom props. 
  reference: https://www.totaltypescript.com/react-component-props-type-helper
*/
type SidebarProps = React.ComponentProps<typeof Sidebar> & {
  navLinks: { title: string; url: string, icon: React.ReactNode }[]
}

export function AppSidebar({ navLinks, ...props }: SidebarProps) {
  const path = usePathname()
  const activeClass = 'bg-sidebar-primary text-white border rounded-md'

  return (
    <Sidebar variant='floating' {...props} className='pr-0'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='#'>
                <div className='flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <CircleDollarSign className='size-4' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <H4>tracker</H4>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* <SidebarSeparator/> */}
      <SidebarContent>
        <SidebarGroup className='pt-6'>
          <SidebarMenu className='gap-2'>
            {navLinks.map((item) => (
              <SidebarMenuItem key={item.title} className=''>
                <SidebarMenuButton
                  asChild
                  size={'lg'}
                  className={`${isActive(path, item.url) && activeClass}`}
                >
                  <Link href={item.url} className='font-medium p-3'>
                  {item.icon}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
