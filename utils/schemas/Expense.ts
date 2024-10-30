import { z } from 'zod'

// Schema for form validation (reference: https://zod.dev/?id=basic-usage)
export const ExpenseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }).max(60),
  description: z.string().max(120).optional(),
  categoryName: z.string().optional(),
  amount: z.coerce
    .number({
      required_error: 'Amount is required.',
      invalid_type_error: 'Amount must be a number.',
    })
    .positive(),
  monthlyDueDate: z.coerce.date().optional(),
})

export type Expense = z.infer<typeof ExpenseSchema>
