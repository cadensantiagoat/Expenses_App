'use client'

// hooks & helpers
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils/utils'
import { format } from 'date-fns'

// components
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '../../ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

type Props = {
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  disabled?: boolean
}

export const DateInput = ({ fieldTitle, nameInSchema, placeholder, disabled }: Props) => {
  const form = useFormContext()
  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-')

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className={`flex flex-col w-full h-[68px] justify-end`}>
          <FormLabel htmlFor={fieldTitleNoSpaces} className='h-[17px]'>
            {fieldTitle}
          </FormLabel>
          <DatePicker field={field} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type Field = {
  name: string
  onBlur: () => void
  onChange: (event: Date | undefined) => void
  ref: (elm: any) => void
  value: Date
}

interface DatePickerProps {
  field: Field
  placeholder?: string
  disabled?: boolean
}

export const DatePicker = ({ field, placeholder, disabled }: DatePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const onSelectDate = (event: Date | undefined, field: Field) => {
    field.onChange(event)
    setShowCalendar(false)
  }
  return (
    <Popover modal open={showCalendar}>
      <PopoverTrigger asChild>
        <FormControl className='block'>
          <Button
          disabled={disabled}
            variant={'outline'}
            onClick={(e) => {
              e.preventDefault()
              setShowCalendar(!showCalendar)
            }}
            className={cn(
              'w-full pl-3 text-left font-normal flex',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value ? format(field.value, 'PPP') : <span>{placeholder}</span>}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 z-50' align='start'>
        <Calendar
          mode='single'
          selected={field.value}
          onSelect={(event) => onSelectDate(event, field)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
