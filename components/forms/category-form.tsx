'use client'

// react / hooks
import { useState, useEffect, useContext, memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// types / server actions
import { CategorySchema, type Category } from '@/utils/schemas/Category'
import { upsertCategory } from '@/actions/categories'

// form helpers
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// components
import { TextInput } from '@/components/forms/inputs/text-inputs'
import { Small, Muted } from '../ui/typography'
import { ColorInput } from './inputs/color-input'
import { IconInput } from './inputs/icon-input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Chip } from '../ui/chip'

/* 
  BEFORE IDEA: Fuly implement category form and Expense form and decide where users can access forms.
  
  IDEA: Nest category form within expense form under 'customize category' radio button?
  Initial category creation can be done via combobox, on 'no results found' display save / submit
  button that creates the category and then opens customize category form with category ID and title
  in default values and then update color and icon fields?

  TO-DO:
  - implement this form in a modal using ModalContext
  - implement clear functionality for icon and color input.
  - implement loading states
  - test / implement edit category functionality
*/
 

type Props = {
  category: Category
  categories?: Category[]
  onSuccess?: (result: any) => void
}

// evaluate use of 'memo' here
const CategoryForm = memo(function CategoryForm({
  category,
  categories,
  onSuccess,
}: Props) {
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  // used for displaying preview chip while selecting color and icon.
  const [colorValue, setColorValue] = useState(category.color)
  const [iconValue, setIconValue] = useState(category.icon)

  const form = useForm<Category>({
    mode: 'onBlur',
    resolver: zodResolver(CategorySchema),
    defaultValues: { ...category },
  })

  useEffect(() => {
    // Evaluate the need for useEffect and LocalStorage for this form.
    // boolean value to indicate form has not been saved.
    localStorage.setItem('category-form-modified', form.formState.isDirty.toString())
  }, [form.formState.isDirty])

  const onSubmit = async () => {
    if (!form.formState.isDirty) {
      setMessage('No changes detected. Try again or close the modal by clicking outside.')
      return
    }

    setMessage('')
    setErrors({})
    /* No need to validate here because 
        react-hook-form already validates with 
        our Zod schema */

    console.log('form values sent to server action: ', form.getValues())
    const result = await upsertCategory(form.getValues())
    if (result?.errors) {
      setMessage(result.message)
      setErrors(result.errors)
      return
    } else {
      setMessage(result.message)
      // onSuccess ? onSuccess(result) : router.back() // temporary workaround. Figure out desired viewing / editing pages.
      form.reset(form.getValues())
    }
  }

  const handleIconChange = (event: string) => {
    form.setValue('icon', event)
    setIconValue(event)
  }

  const handleColorChange = (color: string) => {
    setColorValue(color)
    form.setValue('color', color)
  }

  /* condition to toggle preview of category chip in form. */
  const showChip =
    form.formState.touchedFields.name &&
    form.getValues('name') !== '' &&
    !form.getFieldState('name').error

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
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          <div className='flex flex-col gap-6'>
            <TextInput
              nameInSchema='name'
              fieldTitle='Name'
              placeholder='Something descriptive...'
              className='max-w-72'
            />
            {showChip && (
              <div>
                <Chip title={form.getValues('name')} iconName={iconValue} color={colorValue} />
              </div>
            )}
            <ColorInput
              form={form}
              nameInSchema='color'
              fieldTitle='Color'
              handleChange={handleColorChange}
              defaultValue={colorValue}
            />
            <IconInput
              nameInSchema='icon'
              fieldTitle='Icon'
              handleChange={handleIconChange}
              defaultValue={iconValue}
            />
          </div>
          <div className='pt-6 flex justify-end'>
            <Button type='submit'>
              {form.formState.isSubmitting ? 'Loading' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
})

export default CategoryForm
