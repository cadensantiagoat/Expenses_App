import { any, string, z } from 'zod';

// Schema for form validation (reference: https://zod.dev/?id=basic-usage)
export const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }).max(60),
  description: z.string().max(120).optional(),
  category: z.string().optional(),
  amount: z.coerce
    .number({
      required_error: 'Amount is required.',
      invalid_type_error: 'Amount must be a number.',
    })
    .positive(),
  monthlyDueDate: z.date({
    required_error: 'Monthly due date is required.',
  }),
});
