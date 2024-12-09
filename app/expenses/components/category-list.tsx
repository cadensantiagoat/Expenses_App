'use client'

import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Muted, Small } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
import { useModal, ModalIds } from '@/utils/contexts/modal-context'
import { deleteCategory } from '@/actions/categories'
import type { Category } from '@/utils/schemas/Category'
import { formatCurrency, formatDate, normalizeCategoryData } from '@/utils/utils'
import { StatusChip } from '@/components/table-data/status-chip'
import { toast } from 'sonner'

export const CategoryList = ({ categories }: Category[]) => {
  // compute sum of category's transactions, sort by sum in descending order
  const formattedCategories = categories
    .map((item: any) => normalizeCategoryData(item))
    .sort((a: any, b: any) => b.amountSum - a.amountSum)

  return (
    <div className='w-full grid gap-4'>
      {formattedCategories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  )
}

const Category = ({ category }: Category) => {
  const { amountSum, name, color, transactions } = category
  const style = color === 'default' ? {} : { backgroundColor: color }
  const currentDate = new Date().getDate()

  return (
    <Card className='py-3 bg-sidebar rounded-lg'>
      <div className='h-24 grid grid-cols-3 items-center gap-2 px-6'>
        <div className='flex h-full items-center gap-3'>
          <div className='shrink-0 bg-border w-[3px] rounded-lg h-[61%]' style={style} />
          <div className='flex flex-col gap-1'>
            <CardTitle>{name}</CardTitle>
            <Muted>{formatCurrency(amountSum)}/mo</Muted>
          </div>
        </div>
        <div className='flex items-baseline gap-2 w-full'>
          {/* PROGRESS BAR GOES HERE (future release) */}
        </div>
        <div className=''>
          <EditAndDeleteButtons category={category} />
        </div>
      </div>
      {transactions.length > 0 && (
        <CardContent className='grid gap-2 w-full pr-12'>
          <div className='px-4 pt-4 shadow-none'>
            <div className='grid grid-cols-4 items-center gap-3'>
              <Muted>Title</Muted>
              <Muted>Amount</Muted>
              <Muted>Due</Muted>
              <Muted className='text-center'>Status</Muted>
            </div>
          </div>
          {transactions.map((item) => {
            return (
              <Card key={item.id} className='p-4 shadow-none'>
                <div className='grid grid-cols-4 items-center gap-3'>
                  <Small>{item.title}</Small>
                  <Small>{formatCurrency(item.amount)}</Small>
                  <Small>{formatDate(item.monthlyDueDate)}</Small>
                  <div className='text-center'>
                    <StatusChip status={item.dueDay <= currentDate} />
                  </div>
                </div>
              </Card>
            )
          })}
        </CardContent>
      )}
    </Card>
  )
}

const EditAndDeleteButtons = ({ category }) => {
  const { openModal } = useModal()

  const handleEdit = (category) => {
    openModal(ModalIds.categoryModal, category)
  }

  const handleDelete = async (categoryId) => {
    const response = await deleteCategory(categoryId)
    response?.error ? toast.error(response.message) : toast.success(response.message)
  }

  return (
    <div className='flex justify-end'>
      <Button className='' variant={'ghost'} size={'icon'} onClick={() => handleEdit(category)}>
        <Pencil className='h-4 w-4' />
      </Button>
      <Button
        className=''
        variant={'ghost'}
        size={'icon'}
        onClick={() => handleDelete(category.id)}
      >
        <Trash className='h-4 w-4' />
      </Button>
    </div>
  )
}
