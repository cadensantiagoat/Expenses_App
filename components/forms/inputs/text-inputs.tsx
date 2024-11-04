'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/utils/utils'
import * as Popover from '@radix-ui/react-popover'
import { ColorWheelIcon } from '@radix-ui/react-icons'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '../../ui/textarea'
import { useFormContext } from 'react-hook-form'

type TextInputProps = {
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  description?: string
  disabled?: boolean
  optionalLabel?: string
  className?: string
}

const TextInput = ({
  fieldTitle,
  nameInSchema,
  placeholder,
  description,
  disabled,
  optionalLabel,
  className,
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
              className={cn('w-full', className)}
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
  resize?: boolean
  optionalLabel?: string
}

const TextareaInput = ({
  fieldTitle,
  nameInSchema,
  placeholder,
  readOnly,
  description,
  resize = false,
  optionalLabel,
}: TextAreaProps) => {
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

type ColorProps = {
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  description?: string
  readOnly?: boolean
  optionalLabel?: string
  showColors: boolean
  setShowColors: () => void
}

const ColorInput = ({
  fieldTitle,
  nameInSchema,
  placeholder,
  readOnly,
  description,
  optionalLabel,
  showColors,
  setShowColors,
}: ColorProps) => {
  const form = useFormContext()
  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-')
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{fieldTitle}</FormLabel>
          {optionalLabel && (
            <FormLabel className='pl-2 font-normal text-primary/75'>
              ({optionalLabel})
            </FormLabel>
          )}
          <FormControl>
            <div className='max-w-xs'>
              {/* <ColorPicker open={showColors} onOpenChange={setShowColors} /> */}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { TextInput, TextareaInput }
