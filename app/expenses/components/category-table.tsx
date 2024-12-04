'use client'

import { forwardRef } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Gauge } from '@/components/Gauge'
import { Chip } from '@/components/ui/chip'
import { Button } from '@/components/ui/button'
import { useModal, ModalIds } from '@/utils/contexts/modal-context'

export const CategoryTable = ({ categories, groupedExpenses, transactions }) => {

  const {modals, openModal} = useModal()
  const handleEditClicked = () => {

    openModal(ModalIds.categoryModal)
  }
  return (
    <div className='rounded-md w-full border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[210px]'>Category</TableHead>
            <TableHead>Total due</TableHead>
            <TableHead className='text-center'>Progress</TableHead>
            <TableHead className='text-center'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories &&
            categories.map((category, index) => {
              return (
                category.transactions.length > 0 && (
                  <Collapsible key={category.id} asChild>
                    <>
                      <CollapsibleTrigger asChild>
                        <TableRow
                          key={category.id}
                          className='h-[4.5rem] data-[state=open]:bg-slate-100'
                        >
                          <TableCell className='font-medium'>
                            <Chip
                              title={category.name}
                              color={category.color}
                              iconName={category.icon}
                            />
                          </TableCell>
                          <TableCell>
                            $
                            {category.transactions?.reduce(
                              (acc, curr) => acc + parseFloat(curr.amount),
                              0
                            )}
                          </TableCell>
                          <TableCell className='text-center'>
                            <Gauge value={100 - index * 21} size='small' />
                          </TableCell>
                          <TableCell className='text-center'>
                            <Button variant={"ghost"} size={"sm"} onClick={handleEditClicked}>Edit</Button>
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild className='w-full py-3'>
                            <NestedRow expenses={category.transactions} />
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                )
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}


// used forwardRef to fix this error: "Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"
const NestedRow = forwardRef(({ expenses, ...props }, ref) => {
  return (
    <>
      {expenses
        ? expenses.map((expense) => (
            <TableRow key={expense.id} className='w-full'>
              <TableCell className='pl-7'>{expense.title}</TableCell>
              <TableCell>${expense.amount}</TableCell>
              <TableCell className='text-center'>paid</TableCell>
            </TableRow>
          ))
        : null}
    </>
  )
})

NestedRow.displayName = 'NestedRow'
