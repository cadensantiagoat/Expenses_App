'use client'

import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { Card } from '@/components/ui/card'
import { Small, Muted } from '@/components/ui/typography'
import { useUI } from '@/utils/contexts/ui-context'

export const CategoryOverview = ({ chartData }) => {
  const { state } = useUI()

  return (
    state.showOverview && (
      <Card className='flex items-center gap-3 h-full w-[100%] justify-evenly shadow-none rounded-lg'>
        <CategoryPieChart data={chartData} />
        <div className='shrink-0 bg-border w-[1px] h-[75%]' />
        <div className='flex flex-col justify-evenly h-full w-full max-w-[240px] p-3 pl-4'>
          {chartData.results.map((item, index) => {
            if (index < 4) {
              return (
                <div key={item.name} className='flex items-center justify-between w-full'>
                  <div className='flex items-center'>
                    <div
                      className='mr-2 shrink-0 bg-border w-[3px] h-5 rounded-lg'
                      style={{ backgroundColor: item.fill }}
                    />
                    <Small className=''>{item.name}</Small>
                  </div>
                  <Muted className='self-end'>${item.sum}</Muted>
                </div>
              )
            }
          })}
        </div>
      </Card>
    )
  )
}

const DEFAULT_COLOR = '#E2E8F0'

const CategoryPieChart = ({ data }) => {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data.results}
        innerRadius={60}
        outerRadius={80}
        fill='#8884d8'
        paddingAngle={3}
        dataKey='sum'
      >
        {data.results.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.fill === 'default' ? DEFAULT_COLOR : entry.fill}
          />
        ))}
      </Pie>
    </PieChart>
  )
}
