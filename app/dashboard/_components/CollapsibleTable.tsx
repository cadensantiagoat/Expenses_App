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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Gauge } from '@/components/Gauge'

export const CategoryTable = ({ categories, expenses }) => {
  return (
    <div>
      <div className='rounded-md'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[210px]'>Name</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount due</TableHead>
              <TableHead>Amount paid</TableHead>
              <TableHead className='text-center'>Chart</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories
              ? categories.map((category, index) => (
                  <Collapsible key={category.categoryName} asChild>
                    <>
                      <CollapsibleTrigger asChild>
                        <TableRow
                          key={category.categoryName}
                          className='h-14 data-[state=open]:bg-slate-100'
                        >
                          <TableCell className='font-medium'>
                            {category.categoryName}
                          </TableCell>
                          <TableCell>{category._count}</TableCell>
                          <TableCell>${category._sum.amount.toString()}</TableCell>
                          <TableCell>${category._sum.amount.toString()}</TableCell>
                          <TableCell className='text-center'>
                            <Gauge value={100 - index * 21} size='small' />
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <NestedRow
                          expenses={expenses.filter(
                            (expense) => expense.categoryName === category.categoryName
                          )}
                        />
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// used forwardRef to fix this error: "Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"
const NestedRow = forwardRef(({ expenses, ...props }, ref) => {
  return (
    <>
      {expenses
        ? expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className='pl-3'>{expense.title}</TableCell>
              <TableCell></TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>paid</TableCell>
            </TableRow>
          ))
        : null}
    </>
  )
})

NestedRow.displayName = 'NestedRow'
