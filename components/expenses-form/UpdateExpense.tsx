'use client';

import { ExpenseForm } from './ExpenseForm';
import { updateTransaction } from '@/utils/actions';

// form helpers
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from './schema';
import { z } from 'zod';

export const UpdateExpense = ({ transaction }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: transaction,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateTransaction(transaction.id, values);
  };

  return <ExpenseForm initialValues={transaction} form={form} handleSubmit={onSubmit} />;
};
