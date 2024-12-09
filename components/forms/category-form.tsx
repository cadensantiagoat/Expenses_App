'use client'

// react / hooks
import { useState, useEffect, memo } from 'react'
// types / server actions
import { CategorySchema, type Category } from '@/utils/schemas/Category'
import { IS_CATEGORY_FORM_DIRTY } from '@/utils/constants'
import { upsertCategory } from '@/actions/categories'
// form helpers
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// components
import { TextInput } from '@/components/forms/inputs/inputs'
import { Small, Muted } from '../ui/typography'
import { ColorInput } from './inputs/color-input'
import { IconInput } from './inputs/icon-input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Chip } from '../ui/chip'

type Props = {
  category: Category
  categories?: Category[]
  onSuccess: (result: any) => void
}

// evaluate use of 'memo' here
const CategoryForm = memo(function CategoryForm({ category, categories, onSuccess }: Props) {
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  // used for displaying preview chip while selecting color and icon.
  const [previewText, setPreviewText] = useState(category.name)
  const [colorValue, setColorValue] = useState(category.color)
  const [iconValue, setIconValue] = useState(category.icon)

  const form = useForm<Category>({
    mode: 'onBlur',
    resolver: zodResolver(CategorySchema),
    defaultValues: { ...category },
  })

  useEffect(() => {
    // default (initial) form values
    const { color, icon } = form.formState.defaultValues
    // if color or icon has been changed, set local storage item to true.
    if (color !== colorValue || icon !== iconValue || form.formState.isDirty) {
      localStorage.setItem(IS_CATEGORY_FORM_DIRTY, 'true')
    } else {
      localStorage.setItem(IS_CATEGORY_FORM_DIRTY, 'false')
    }
  }, [form.formState.isDirty, form.formState.defaultValues, colorValue, iconValue])

  const onSubmit = async () => {
    setMessage('')
    setErrors({})

    console.log('formData: ', form.getValues())
    const result = await upsertCategory(form.getValues())
    if (result?.errors) {
      setMessage(result.message)
      setErrors(result.errors)
      return
    } else {
      setMessage(result.message)
      onSuccess(result)
      form.reset(form.getValues())
    }
  }

  // CLICK / EVENT HANDLERS
  const handleNameChange = (e: any, field: any) => {
    setPreviewText(e.target.value)
    field.onChange(e.target.value)
  }

  const handleIconChange = (event: string) => {
    form.setValue('icon', event)
    setIconValue(event)
  }

  const handleColorChange = (color: string) => {
    form.setValue('color', color)
    setColorValue(color)
  }

  /* condition to toggle preview of category chip in form. */
  const showChip =
    form.formState.touchedFields.name &&
    previewText !== '' &&
    previewText.length > 2 &&
    !form.getFieldState('name').error

  return (
    <>
      {message ? <Muted>{message}</Muted> : null}

      {/* Displays error message returned by the server action */}
      {errors && message != '' && (
        <div className='py-3 text-red-500'>
          {Object.keys(errors).map((key) => (
            <Small key={key}>{`${errors[key as keyof typeof errors]}`}</Small>
          ))}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          <div className='flex flex-col gap-6'>
            <div className='flex gap-3'>
              <div className='min-w-64 grow'>
                <TextInput
                  label='Name'
                  nameInSchema='name'
                  placeholder='Something descriptive...'
                  onChange={handleNameChange}
                  value={previewText}
                />
              </div>
              {showChip && (
                <div className='self-end flex-nowrap'>
                  <Chip
                    title={form.getValues('name')}
                    iconName={iconValue}
                    color={colorValue ? colorValue : 'default'}
                  />
                </div>
              )}
            </div>
            <div className='flex gap-6 max-w-[262px]'>
              <ColorInput
                nameInSchema='color'
                fieldTitle='Color'
                handleChange={handleColorChange}
                defaultValue={colorValue}
                value={colorValue}
              />
              <IconInput
                nameInSchema='icon'
                fieldTitle='Icon'
                handleChange={handleIconChange}
                defaultValue={iconValue}
              />
            </div>
          </div>
          <div className='pt-6 flex items-center justify-center gap-3'>
            <Button type='submit' className='w-full'>
              {form.formState.isSubmitting ? 'Loading' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
})

export default CategoryForm
