'use client'
import React, { useEffect } from 'react'
import { Label, Pie, PieChart } from 'recharts'
import { Card } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Small, Muted } from '@/components/ui/typography'





export const CategoryOverview = ({ chartData, categories, groupedExpenses }) => {

  return (
    <div className='flex flex-col w-full md:max-w-[75%] lg:max-w-[50%]'>
      <div className='flex py-6 pr-6'>
        <CategoryPieChart chartData={chartData.results} chartConfig={chartData.config} />
        <div className='w-[50%]'>
          <div className='flex flex-col justify-evenly h-full max-w-[240px]'>
            {chartData.results.map((item, index) => {
              if (index < 4) {
                return (
                  <div key={item.name} className='flex items-center justify-between w-full'>
                    <div className='flex items-center'>
                      <div
                        className='mr-2 shrink-0 bg-border w-[2px] h-4'
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
        </div>
      </div>
    </div>
  )
}

const CategoryPieChart = ({ chartData, chartConfig }) => {
  const totalSum = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.sum, 0)
  }, [chartData])
  return (
    <ChartContainer
      config={chartConfig}
      className='aspect-square max-h-[200px] w-[50%] justify-start'
    >
      <PieChart height={100}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey='sum' nameKey='name' innerRadius={60} strokeWidth={5}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor='middle'
                    dominantBaseline='middle'
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className='fill-foreground text-3xl font-bold'
                    >
                      ${totalSum.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className='fill-muted-foreground'
                    >
                      Categories
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
