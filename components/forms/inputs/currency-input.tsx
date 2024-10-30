'use client'
import { useFormContext } from 'react-hook-form'
import CurrencyInput from 'react-currency-input-field'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type InputProps = {
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  description?: string
  readOnly?: boolean
  maxLength?: number
  prefix?: string
}

export const CurrencyFormattedInput = ({
  nameInSchema,
  fieldTitle,
  placeholder,
  description,
  maxLength = 9,
  prefix = '$',
}: InputProps) => {
  const form = useFormContext()
  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-')

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className='w-auto'>
          <FormLabel htmlFor={fieldTitleNoSpaces}>{fieldTitle}</FormLabel>
          <FormControl>
            <CurrencyInput
              className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
              id={fieldTitleNoSpaces}
              value={field.value}
              onValueChange={field.onChange}
              placeholder={placeholder}
              maxLength={maxLength}
              prefix={prefix}
              step={1}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
