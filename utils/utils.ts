import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isFuture, isPast } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  return format(new Date(date), 'iii, MMM do')
}

export const determineStatusByDate = (date: Date) => {
  const dueDate = new Date(date)

  if (isFuture(dueDate)) return 'unpaid'
  else if (isPast(dueDate)) return 'paid'
  else return 'pending'
}
