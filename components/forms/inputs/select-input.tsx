'use client'

import { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SelectInputProps = {
  fieldTitle: string
  nameInSchema: string
  selectOptions: any // FIX THIS
  placeholder?: string
  description?: string
  readOnly?: boolean
}

export const SelectInput = ({
  fieldTitle,
  nameInSchema,
  selectOptions,
  placeholder,
  description,
  readOnly,
}: SelectInputProps) => {
  const form = useFormContext()
  const fieldTitleNoSpaces = fieldTitle.replaceAll(' ', '-')

  return (
    <div>
      <FormField
        control={form.control}
        name={nameInSchema}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={fieldTitleNoSpaces}>{fieldTitle}</FormLabel>

            <FormControl>
              <MySelect
                {...field}
                disabled={readOnly}
                placeholder={placeholder}
                value={field.value}
                onValueChange={field.onChange}
                selectOptions={selectOptions}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

type SelectProps = {
  value: string
  onValueChange: () => void
  selectOptions: any
  defaultValue?: any
  placeholder?: string
  disabled?: boolean
}

const MySelect = forwardRef(
  (
    {
      onValueChange,
      value,
      defaultValue,
      placeholder,
      selectOptions,
      disabled,
    }: SelectProps,
    forwardedRef
  ) => {
    return (
      <div ref={forwardedRef}>
        <Select
          onValueChange={onValueChange}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {selectOptions.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }
)
MySelect.displayName = 'MySelect'
