import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isFuture, isPast } from 'date-fns'
import { pSBC } from './color-converter'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  return format(new Date(date), 'do')
}

export const determineStatusByDate = (date: Date) => {
  const dueDate = new Date(date)

  if (isFuture(dueDate)) return 'unpaid'
  else if (isPast(dueDate)) return 'paid'
  else return 'pending'
}

export const randomNumber = (max: number) => {
  return Math.floor(Math.random() * max)
}

/* 
  TEMPORARY SOLUTION FOR BUILDING CHART DATA
  Should handle as much computation and sorting at the database level
*/
const buildChartConfig = (data) => {
  let config = {};
  for (let i = 0; i < data.length; i++) {
    const key = data[i].name.toLowerCase().replace(' ', '_')
    config[key] = {
      label: data[i].name,
      color: data[i].fill
    }
  }
  return config
}

export const buildChartData = async (groupedData, categories) => {
  // sort groupedData by sum in descending order
  groupedData.sort((a, b) => b._sum.amount - a._sum.amount)

  // build chart data array of objects. Need to build a query to get this instead
  let results = []
  for (let i = 0; i < groupedData.length; i++) {
      results.push({
          name: groupedData[i].categoryName,
          count: groupedData[i]._count,
          sum: parseFloat(groupedData[i]._sum.amount) 
      })
      for (let j = 0; j < categories.length; j++) {
          if (groupedData[i].categoryName === categories[j].name) {
              results[i].fill = pSBC(0.36, categories[j].color)
          }
      }
  }
  // pass chart data to build config function
  const config = buildChartConfig(results);
  return {results, config};
}
/* END TEMPORARY SOLUTION */
