import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(60),
  userId: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
})

export type Category = z.infer<typeof CategorySchema>
