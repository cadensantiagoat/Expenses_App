'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createCategory } from '@/actions/categories'
import Submit from './Submit'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Modal from '@/components/Modal'
import { TextInput } from '@/components/forms/inputs/text-inputs'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

// Form does not show error message in the UI when a duplicate category name is found.
// consider checking for duplicates in the form schema
// using a queried list of categories from the DB.

// Needs refactoring. Figure out actual need / place to put add category functionality.

const schema = z.object({
  name: z.string().min(2, { message: 'Title must be at least 2 characters.' }).max(100),
})

const CategoryForm = ({
  defaultValue = '',
  onSave,
}: {
  defaultValue?: string
  onSave: (data?: any) => void
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: defaultValue },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const response = await createCategory(values.name)
    if (response.success) {
      onSave(response.data)
    } else {
      console.log('ERROR: ', response)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex items-end gap-3 pb-6'>
          <TextInput
            nameInSchema='name'
            fieldTitle='Name'
            placeholder='Name your category'
            className='w-full'
          />
          {/* <Button asChild variant={'outline'}>
            <Modal.Close>Cancel</Modal.Close>
          </Button> */}
          <Button type='submit'>
            {form.formState.isSubmitting ? 'Loading' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CategoryForm
