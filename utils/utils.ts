import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isFuture, isPast, formatISO } from 'date-fns'
import { pSBC } from './color-converter'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* DATE HELPERS */

// TEMPORARY SOLUTION to update to current month. Should change DB type or figure out solution to store due date for each month.
export function updateMonthToCurrent(date: string | Date) {
  // convert Date object to ISO string if 'date' is not a string.
  const dateString = typeof date === 'object' ? formatISO(date) : date
  const dateParts = dateString.split('-')
  const day = dateParts[2].slice(0, 2)

  // construct new date with current month
  return new Date(dateParts[0], new Date().getMonth(), day)
}
// if (transaction.frequency === 'Monthly') {
//   const dueDay = transaction.monthlyDueDate?.getDate()
//   const today = new Date().getDate()
//   let status = 'Unpaid'
//   if (today >= dueDay) status = 'Paid'
//   return status
// }
export const formatDate = (date: Date) => {
  return format(new Date(date), 'MMM do')
}

export const determineStatusByDate = (date: Date) => {
  const dueDate = new Date(date)

  if (isFuture(dueDate)) return 'unpaid'
  else if (isPast(dueDate)) return 'paid'
  else return 'pending'
}

/* NUMBER HELPERS */
export const randomNumber = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const formatCurrency = (number: number | bigint, currency = 'USD', language = 'en-US') => {
  const result = new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currency,
  }).format(number)
  return result
}

/* 
  TEMPORARY SOLUTION FOR BUILDING CHART DATA
  Should handle as much computation and sorting at the database level
*/
const buildChartConfig = (data) => {
  let config = {}
  for (let i = 0; i < data.length; i++) {
    const key = data[i].name.toLowerCase().replace(' ', '_')
    config[key] = {
      label: data[i].name,
      color: data[i].fill,
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
      id: groupedData[i].categoryId,
      count: groupedData[i]._count,
      sum: parseFloat(groupedData[i]._sum.amount),
    })
    for (let j = 0; j < categories.length; j++) {
      if (groupedData[i].categoryId === categories[j].id) {
        results[i].fill = pSBC(0.36, categories[j].color)
        results[i].name = categories[j].name
      }
    }
  }
  // pass chart data to build config function
  const config = buildChartConfig(results)
  return { results, config }
}
/* END TEMPORARY SOLUTION */
