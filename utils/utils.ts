import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isFuture, isPast, formatISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* --- DATE HELPERS --- */
// TEMPORARY SOLUTION to update to current month. Should change DB type or figure out solution to store due date for each month.
export function updateMonthToCurrent(date: string | Date) {
  // convert Date object to ISO string if 'date' is not a string.
  const dateString = typeof date === 'object' ? formatISO(date) : date
  const dateParts = dateString.split('-')
  const day = dateParts[2].slice(0, 2)

  // construct new date with current month
  return new Date(dateParts[0], new Date().getMonth(), day)
}

export const formatDate = (date: Date) => {
  return format(new Date(date), 'MMM do')
}

export const normalizeDate = (date) => {
  const dateString = typeof date !== 'string' ? formatISO(date) : date
  const dueDate = new Date(dateString)
  return dueDate
}

export const determineStatusByDate = (date: Date) => {
  const dueDate = new Date(date)

  if (isFuture(dueDate)) return 'unpaid'
  else if (isPast(dueDate)) return 'paid'
  else return 'pending'
}
/* ----------------- */

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
        // results[i].fill = pSBC(0.12, categories[j].color)
        results[i].fill = categories[j].color
        results[i].name = categories[j].name
      }
      if (!groupedData[i].categoryId) {
        results[i].fill = '#E2E8F0'
        results[i].name = 'Uncategorized'
      }
    }
  }
  return { results }
}

export const normalizeCategoryData = (category) => {
  const sum = category.transactions
    .reduce(
      (accumulator: number, currentValue: any) => accumulator + parseFloat(currentValue.amount),
      0
    )
    .toFixed(2)

  return {
    amountSum: sum,
    ...category,
  }
}
