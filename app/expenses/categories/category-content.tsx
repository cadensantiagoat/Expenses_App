'use client'

import { CategoryTable } from '@/app/dashboard/components/CollapsibleTable'

export const CategoryContent = ({ categories, groupedExpenses, transactions }) => {

  return (
    <div className='flex w-full h-full'>
      <CategoryTable
        categories={categories}
        groupedExpenses={groupedExpenses}
        transactions={transactions}
      />
    </div>
  )
}
