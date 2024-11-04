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
} from '@/components/ui/select'

const defaultColors = [
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
  form: any
  nameInSchema: string
  fieldTitle: string
  defaultValue?: string
}

const ColorInput = ({ form, defaultValue, nameInSchema, fieldTitle }: InputProps) => {
  const onColorChange = (color: any) => {
    form.setValue(nameInSchema, color)
  }

  return (
    <div className='space-y-2'>
      <FormLabel className='pb-1'>
        {fieldTitle}
        <span className='pl-2 font-normal text-primary/75'>(optional)</span>
      </FormLabel>
      <ColorSelect
        name={nameInSchema}
        handleChange={onColorChange}
        defaultValue={defaultValue}
      />
    </div>
  )
}

type ColorSelectProps = {
  name: string
  handleChange: (color: string) => void
  selectOptions?: string[]
  defaultValue?: string
}

const ColorSelect = ({
  name,
  handleChange,
  selectOptions = defaultColors,
  defaultValue,
}: ColorSelectProps) => {
  return (
    <Select
      onValueChange={handleChange}
      name={name}
      defaultValue={defaultValue}
    >
      <SelectTrigger className='w-[81px]'>
        <SelectValue placeholder='Select' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <div className='grid grid-cols-6 grid-rows-3 gap-2 p-3 max-h-fit z-50'>
            {selectOptions.map((item) => {
              return (
                <ColorSelectItem key={item} value={item} className='rounded-sm p-0'>
                  <div className='p-1'>
                    <div style={{ backgroundColor: item }} className='rounded-full h-[16px] w-[16px]' />
                  </div>
                </ColorSelectItem>
              )
            })}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { ColorInput }
