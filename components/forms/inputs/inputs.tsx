'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utils/utils'
import { Textarea, TextareaProps } from '../../ui/textarea'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { RadioComponent } from './radio-component'
import CurrencyInput from 'react-currency-input-field'
import { FormControl, FormField, FieldWrapper } from '@/components/ui/form'
import { DatePicker } from './date-input'

interface InputProps {
  className?: string
  description?: string
  disabled?: boolean
  label: string
  nameInSchema: string
  optionalLabel?: boolean
  placeholder?: string
  onChange?: (e: any, field: any) => void
  value?: string
}

const TextInput = ({
  label,
  nameInSchema,
  placeholder,
  description,
  disabled,
  optionalLabel,
  className,
  onChange,
  value,
}: InputProps) => {
  const form = useFormContext()
  const labelNoSpaces = label.replaceAll(' ', '-')

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FieldWrapper
          label={label}
          optionalLabel={optionalLabel}
          description={description}
          labelNoSpaces={labelNoSpaces}
        >
          <Input
            {...field}
            className={cn('w-full', className)}
            value={onChange ? value : field.value}
            id={labelNoSpaces}
            placeholder={placeholder || label}
            onChange={onChange ? (e) => onChange(e, field) : (e) => field.onChange(e.target.value)}
            disabled={disabled}
          />
        </FieldWrapper>
      )}
    />
  )
}

interface TextAreaProps extends InputProps {
  resize?: boolean
}

const TextareaInput = ({
  label,
  nameInSchema,
  placeholder,
  disabled,
  description,
  resize = false,
  optionalLabel,
  className,
}: TextAreaProps) => {
  const form = useFormContext()
  const labelNoSpaces = label.replaceAll(' ', '-')
  const enableResize = resize ? '' : 'resize-none'
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FieldWrapper
          label={label}
          optionalLabel={optionalLabel}
          description={description}
          labelNoSpaces={labelNoSpaces}
        >
          <Textarea
            {...field}
            id={labelNoSpaces}
            className={cn(enableResize, className)}
            placeholder={placeholder || label}
            disabled={disabled}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        </FieldWrapper>
      )}
    />
  )
}

interface SelectInputProps extends InputProps {
  options: { value: string; label: string }[]
  defaultValue?: string
}

const SelectInput = ({
  label,
  nameInSchema,
  options,
  placeholder,
  description,
  optionalLabel,
  disabled,
  defaultValue,
}: SelectInputProps) => {
  const form = useFormContext()
  const labelNoSpaces = label.replaceAll(' ', '-')

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FieldWrapper
          label={label}
          optionalLabel={optionalLabel}
          description={description}
          labelNoSpaces={labelNoSpaces}
        >
          <Select
            onValueChange={field.onChange}
            defaultValue={defaultValue}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldWrapper>
      )}
    />
  )
}

interface CurrencyInputProps extends InputProps {
  maxLength?: number
  prefix?: string
}

const CurrencyFormattedInput = ({
  label,
  nameInSchema,
  placeholder,
  disabled,
  description,
  optionalLabel,
  className,
  maxLength = 9,
  prefix = '$',
}: CurrencyInputProps) => {
  const form = useFormContext()
  const labelNoSpaces = label.replaceAll(' ', '-')

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FieldWrapper
          label={label}
          optionalLabel={optionalLabel}
          description={description}
          labelNoSpaces={labelNoSpaces}
        >
          <CurrencyInput
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            id={labelNoSpaces}
            value={field.value}
            onValueChange={field.onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            prefix={prefix}
            step={1}
          />
        </FieldWrapper>
      )}
    />
  )
}

const RadioInput = ({ label, nameInSchema, description, optionalLabel }: InputProps) => {
  const form = useFormContext()
  const labelNoSpaces = label.replaceAll(' ', '-')
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FieldWrapper
          label={label}
          optionalLabel={optionalLabel}
          description={description}
          labelNoSpaces={labelNoSpaces}
        >
          <RadioComponent
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          />
        </FieldWrapper>
      )}
    />
  )
}

const DateInput = ({
  label,
  nameInSchema,
  placeholder,
  description,
  disabled,
  optionalLabel,
  className,
}: InputProps) => {
  const form = useFormContext()
  const labelNoSpaces = label.replaceAll(' ', '-')

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FieldWrapper
          label={label}
          optionalLabel={optionalLabel}
          description={description}
          labelNoSpaces={labelNoSpaces}
        >
          <DatePicker field={field} placeholder={placeholder} disabled={disabled} />
        </FieldWrapper>
      )}
    />
  )
}

export { TextInput, TextareaInput, SelectInput, CurrencyFormattedInput, RadioInput, DateInput }
