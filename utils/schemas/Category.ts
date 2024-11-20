import { z } from 'zod'
import {ExpenseSchema} from '@/utils/schemas/Expense'


export const CategorySchema = z.object({
  color: z.string().optional(),
  icon: z.string().optional(),
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(60),
  transactions: z.array(ExpenseSchema).optional(),
  userId: z.string().optional(),
})

export type Category = z.infer<typeof CategorySchema>
