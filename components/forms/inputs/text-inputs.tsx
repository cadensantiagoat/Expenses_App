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
  readOnly?: boolean
}

const TextInput = ({
  fieldTitle,
  nameInSchema,
  placeholder,
  description,
  readOnly,
}: TextInputProps) => {
  const form = useFormContext()
  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-')

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={fieldTitleNoSpaces}>{fieldTitle}</FormLabel>

          <FormControl>
            <Input
              {...field}
              id={fieldTitleNoSpaces}
              className='w-full max-w-xs'
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
}: {
  // form: any
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  readOnly?: boolean
  description?: string
  resize?: boolean
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
