'use client'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import type { Category } from '@/utils/schemas/Category'

type Props = {
  categories: Category[]
  table: any
}

const CategoryFilter = ({ categories, table }: Props) => {
  const column = table.getColumn('categoryName')
  const filters = table.getState().columnFilters
  const index = column?.getFilterIndex()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size={'sm'} className='inline-flex items-center'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          Categories
          <div className='flex items-center'>
            {filters[index] && <div className='shrink-0 bg-border w-[1px] mx-2 h-4' />}
            {filters[index] &&
              filters[index].value.map((item: string) => (
                <span key={item} className='ml-2 px-2 bg-accent rounded-sm'>
                  {item}
                </span>
              ))}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {categories.map((category) => {
          const isChecked = filters[index]
            ? filters[index].value.includes(category.name)
            : false

          return (
            <DropdownMenuCheckboxItem
              key={category.id}
              className=''
              checked={isChecked}
              onCheckedChange={(value) => {
                if (value) {
                  // check if this is the first filter added or not.
                  index < 0
                    ? column?.setFilterValue([category.name])
                    : column?.setFilterValue([...filters[index].value, category.name])
                } else {
                  column?.setFilterValue(
                    filters[index].value.filter((name: string) => name != category.name)
                  )
                }
              }}
            >
              {category.name}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default CategoryFilter
