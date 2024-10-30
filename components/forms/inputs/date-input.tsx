'use client'

// hooks & helpers
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils/utils'
import { format } from 'date-fns'

// components
import { Button } from '@/components/ui/button'
import { Calendar } from '../../ui/calendar'
import { CalendarIcon } from 'lucide-react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type Props = {
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  description?: string
  readOnly?: boolean
}

const DatePicker = ({
  fieldTitle,
  nameInSchema,
  placeholder,
  description,
  readOnly,
}: Props) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const form = useFormContext()
  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-')

  // Possibly implement custom onSelect function to show/hide calendar
  // reference: https://daypicker.dev/guides/input-fields

  return (
    <div className='space-y-2'>
      <FormField
        control={form.control}
        name={nameInSchema}
        render={({ field }) => (
          <FormItem className='flex flex-col space-y-3'>
            <FormLabel htmlFor={fieldTitleNoSpaces}>{fieldTitle}</FormLabel>
            <FormControl>
              <>
                <Button
                  variant={'outline'}
                  onClick={(e) => {
                    e.preventDefault()
                    setShowCalendar(true)
                  }}
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? format(field.value, 'PPP') : <span>{placeholder}</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>

                {showCalendar && (
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                )}
              </>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default DatePicker
