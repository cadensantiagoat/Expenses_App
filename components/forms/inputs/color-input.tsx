'use client'

import React from 'react'
import { FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  ColorSelectItem,
  SelectSeparator,
  SelectItem,
} from '@/components/ui/select'

const defaultColors = [
  // '#F8FAFC', // Default chip background color
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
]

type InputProps = {
  nameInSchema: string
  fieldTitle: string
  handleChange: (color: any) => void
  defaultValue?: string
  value: string | undefined
}

const ColorInput = ({
  value,
  defaultValue,
  nameInSchema,
  fieldTitle,
  handleChange,
}: InputProps) => {
  return (
    <div className='space-y-2 w-full'>
      <FormLabel>{fieldTitle}</FormLabel>
      <ColorSelect
        name={nameInSchema}
        handleChange={handleChange}
        defaultValue={defaultValue}
        value={value}
      />
      <span className='pl-1 text-xs font-normal text-primary/75'>Optional</span>
    </div>
  )
}

type ColorSelectProps = {
  name: string
  handleChange: (color: string) => void
  selectOptions?: string[]
  defaultValue?: string
  value: string | undefined
}

const ColorSelect = ({
  name,
  handleChange,
  selectOptions = defaultColors,
  defaultValue = defaultColors[0],
  value,
}: ColorSelectProps) => {
  return (
    <Select onValueChange={handleChange} name={name} defaultValue={defaultValue} value={value}>
      <SelectTrigger className='min-w-[81px]'>
        <SelectValue placeholder='Select' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <div className='grid grid-cols-6 grid-rows-3 gap-2 p-3 max-h-fit z-50'>
            {selectOptions.map((item) => {
              return (
                <ColorSelectItem key={item} value={item} className='rounded-sm p-0'>
                  <div className='p-1'>
                    <div
                      style={{ backgroundColor: item }}
                      className='rounded-full h-[16px] w-[16px]'
                    />
                  </div>
                </ColorSelectItem>
              )
            })}
          </div>
          <SelectSeparator />
          <SelectItem key={'default'} value='default'>
            Default
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { ColorInput }
