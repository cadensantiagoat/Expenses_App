'use client'

// react / hooks
import { useState, useEffect } from 'react'

// types / server actions
import type { Expense } from '@/utils/schemas/Expense'
import type { Category } from '@/utils/schemas/Category'
import { updateOrCreateExpense } from '@/actions/expenses'

// form helpers
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ExpenseSchema } from '@/utils/schemas/Expense'

// components
import {
  TextInput,
  TextareaInput,
  SelectInput,
  CurrencyFormattedInput,
  RadioInput,
  DateInput,
} from '@/components/forms/inputs/inputs'
import { Muted, Small } from '@/components/ui/typography'
import { FormDescription } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { IS_EXPENSE_FORM_DIRTY } from '@/utils/constants'

type Props = {
  expense: Expense
  categories: Category[]
  onSuccess?: (result: any) => void
}

export default function ExpenseForm({ expense, categories, onSuccess }: Props) {
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const form = useForm<Expense>({
    mode: 'onBlur',
    resolver: zodResolver(ExpenseSchema),
    defaultValues: { ...expense },
  })

  useEffect(() => {
    // boolean value to indicate form has not been saved.
    localStorage.setItem(IS_EXPENSE_FORM_DIRTY, form.formState.isDirty.toString())
  }, [form.formState.isDirty])

  async function onSubmit() {
    if (!form.formState.isDirty) {
      setMessage('No changes detected. Try again or close the modal by clicking outside.')
      return
    }

    setMessage('')
    setErrors({})
    /* No need to validate here because 
        react-hook-form already validates with 
        our Zod schema */
    console.log(form.getValues())
    const result = await updateOrCreateExpense(form.getValues())
    if (result?.errors) {
      console.log('ERROR: ', result)
      setMessage(result.message)
      setErrors(result.errors)
      return
    } else {
      setMessage(result.message)
      onSuccess ? onSuccess(result) : console.log('onSuccess not found') // temporary workaround. Figure out desired viewing / editing pages.
      form.reset(form.getValues())
    }
  }

  return (
    <>
      {message ? <Muted>{message}</Muted> : null}

      {/* Displays error message returned by the server action */}
      {errors && message != '' && (
        <div className='py-3 text-red-500'>
          {Object.keys(errors).map((key) => (
            <Small key={key}>{`${key}: ${errors[key as keyof typeof errors]}`}</Small>
          ))}
        </div>
      )}

      <Form {...form}>
        <form
          className='flex flex-col space-y-6'
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
          }}
        >
          {/* Title (text-input */}
          <div className='max-w-xs'>
            <TextInput label='Title' nameInSchema='title' disabled={form.formState.isLoading} />
          </div>

          {/* Description (textarea) */}
          <TextareaInput
            label='Description'
            nameInSchema='description'
            disabled={form.formState.isLoading}
            className='h-9 py-1.5'
            resize
            optionalLabel
          />

          {/* Category (select) */}
          <div className='max-w-xs'>
            <SelectInput
              label='Category'
              nameInSchema='categoryId'
              placeholder='Select category'
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </div>

          {/*  Amount (currency input component) */}
          <div className=''>
            <CurrencyFormattedInput
              nameInSchema='amount'
              label='Amount'
              placeholder='$0.00'
              className='w-36'
            />
          </div>

          {/* AutopayEnabled (custom radio component) */}
          <RadioInput
            nameInSchema='autopayEnabled'
            label='Is Auto pay enabled for this expense?'
          />

          {/* Due date & Frequency wrapper */}
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              {/* Due date (date-picker) */}
              <div className='w-[61%]'>
                <DateInput label='Due Date' nameInSchema='monthlyDueDate' />
              </div>

              {/* Frequency (select) */}
              <div className='w-[39%]'>
                <SelectInput
                  label='Frequency'
                  nameInSchema='frequency'
                  options={[
                    { value: 'Monthly', label: 'Monthly' },
                    { value: 'Annual', label: 'Annual' },
                  ]}
                />
              </div>
            </div>
            {/* helper text for date picker */}
            <FormDescription className='w-[61%] pt-3 pl-2'>
              {form.getValues('frequency') === 'Monthly'
                ? 'Select the day that this expense is due each month.'
                : 'Select the date that this expense is due each year.'}
            </FormDescription>
          </div>

          {/* Button container */}
          <div className='pt-3 flex'>
            <Button type='submit' className='w-full' disabled={form.formState.isLoading}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
