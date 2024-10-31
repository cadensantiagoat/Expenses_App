'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Textarea } from '../../ui/textarea'
import { useFormContext } from 'react-hook-form'

type TextInputProps = {
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  description?: string
  disabled?: boolean
  optionalLabel?: string
}

const TextInput = ({
  fieldTitle,
  nameInSchema,
  placeholder,
  description,
  disabled,
  optionalLabel,
}: TextInputProps) => {
  const form = useFormContext()
  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-')

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={fieldTitleNoSpaces}>
            {fieldTitle}
            {optionalLabel && (
              <FormLabel className='pl-2 font-normal text-primary/75'>
                (optionalLabel)
              </FormLabel>
            )}
          </FormLabel>

          <FormControl>
            <Input
              {...field}
              className='w-full max-w-xs'
              value={field.value}
              id={fieldTitleNoSpaces}
              placeholder={placeholder || fieldTitle}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type TextAreaProps = {
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  description?: string
  readOnly?: boolean
}

const TextareaInput = ({
  fieldTitle,
  nameInSchema,
  placeholder,
  readOnly,
  description,
  resize = false,
  optionalLabel,
}: {
  // form: any
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  readOnly?: boolean
  description?: string
  resize?: boolean
  optionalLabel?: string
}) => {
  const form = useFormContext()
  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-')
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldTitle}</FormLabel>
          {optionalLabel && (
            <FormLabel className='pl-2 font-normal text-primary/75'>
              ({optionalLabel})
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              {...field}
              id={fieldTitleNoSpaces}
              className={resize ? '' : 'resize-none'}
              placeholder={placeholder || fieldTitle}
              readOnly={readOnly}
              disabled={readOnly}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { TextInput, TextareaInput }
