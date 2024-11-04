'use client'

// react / hooks
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// types / server actions
import type { Expense } from '@/utils/schemas/Expense'
import type { Category } from '@/utils/schemas/Category'
import { updateOrCreateExpense } from '@/actions/expenses'

// form helpers
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ExpenseSchema } from '@/utils/schemas/Expense'

// components
import { Button } from '@/components/ui/button'
import { TextInput, TextareaInput } from '@/components/forms/inputs/text-inputs'
import { SelectInput } from '@/components/forms/inputs/select-input'
import { CurrencyFormattedInput } from '@/components/forms/inputs/currency-input'
import { Form } from '@/components/ui/form'
import { Muted, P, Small } from '@/components/ui/typography'
import DatePicker from '@/components/forms/inputs/date-input'
import Modal from '@/components/Modal'
import { toast } from 'sonner'

/*
  TO-DO: Can't see/click Submit button on smaller screens when calendar is visible.
*/

type Props = {
  expense: Expense
  categories: Category[]
  onSuccess?: (result: any) => void
}

export default function ExpenseForm({ expense, categories, onSuccess }: Props) {
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const form = useForm<Expense>({
    mode: 'onBlur',
    resolver: zodResolver(ExpenseSchema),
    defaultValues: { ...expense },
  })

  useEffect(() => {
    // boolean value to indicate form has not been saved.
    localStorage.setItem('expense-form-modified', form.formState.isDirty.toString())
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
    const result = await updateOrCreateExpense(form.getValues())
    if (result?.errors) {
      setMessage(result.message)
      setErrors(result.errors)
      return
    } else {
      setMessage(result.message)
      onSuccess ? onSuccess(result) : router.back() // temporary workaround. Figure out desired viewing / editing pages.
      form.reset(form.getValues())
    }
  }

  return (
    <div className='p-4'>
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
          className='flex flex-col space-y-5'
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
          }}
        >
          <TextInput
            fieldTitle='Title'
            nameInSchema='title'
            disabled={form.formState.isLoading}
          />

          <TextareaInput
            fieldTitle='Description'
            nameInSchema='description'
            readOnly={form.formState.isLoading}
            optionalLabel='optional'
          />
          <div className='max-w-xs'>
            <SelectInput
              fieldTitle='Category'
              nameInSchema='categoryName'
              placeholder='Select category'
              selectOptions={categories}
            />
          </div>
          <div className='max-w-36'>
            <CurrencyFormattedInput
              nameInSchema='amount'
              fieldTitle='Amount'
              placeholder='$0.00'
            />
          </div>
          <DatePicker fieldTitle='Due Date' nameInSchema='monthlyDueDate' />
          <div className='pt-3 flex'>
            <Button type='submit' className='w-full' disabled={form.formState.isLoading}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
