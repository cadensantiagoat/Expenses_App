'use client'

import React, { useMemo } from 'react'
import { createIconList, ICONS } from '@/utils/icons'
import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  IconSelectItem,
  SelectSeparator,
} from '@/components/ui/select'

type InputProps = {
  nameInSchema: string
  fieldTitle: string
  handleChange: (event: string) => void
  defaultValue?: string
}

const IconInput = ({ nameInSchema, fieldTitle, handleChange, defaultValue }: InputProps) => {
  return (
    <div className='space-y-2 w-full'>
      <FormLabel>{fieldTitle}</FormLabel>
      <IconSelect name={nameInSchema} handleChange={handleChange} defaultValue={defaultValue} />
      <span className='pl-1 text-xs font-normal text-primary/75'>Optional</span>
    </div>
  )
}

type Props = {
  options?: { id: string }[]
  name: string
  handleChange: (event: string) => void
  defaultValue?: string
}

const IconSelect = ({ options = ICONS, name, handleChange, defaultValue }: Props) => {
  // runs twice due to re-renders of parent components.
  const iconList = useMemo(() => createIconList(options), [options])

  return (
    <Select onValueChange={handleChange} name={name} defaultValue={defaultValue ? defaultValue : ''}>
      <SelectTrigger className='min-w-[81px]'>
        <SelectValue placeholder='Select' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <div className='grid grid-cols-6 grid-rows-3 gap-2 p-3 max-h-fit z-50'>
            {iconList.map((item) => {
              return (
                <IconSelectItem key={item.id} value={item.id} className='p-0 rounded-sm'>
                  <Button variant={'ghost'} size={'icon'} className='p-1'>
                    {item.icon}
                  </Button>
                </IconSelectItem>
              )
            })}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { IconInput }
