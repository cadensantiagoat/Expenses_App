'use client';

import { useState } from 'react';

// components
import { DialogModal } from '@/components/Dialog';
import { ExpenseForm } from './ExpenseForm';

// form helpers
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from './schema';
import { z } from 'zod';

// server action
import { newTransaction } from '@/utils/actions';

// TO-DO: implement loading on form submission. Fix monthlyDueDate type

export const CreateExpense = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      amount: 0,
      category: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // call server action.
    newTransaction(values)
      .then(() => {
        setOpen(false);
        form.reset();
        console.log('SUCCESS: transaction added to database.');
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      });
  }

  return (
    <DialogModal
      title={'Create expense'}
      description={`Required fields are marked with an asterisk *`}
      buttonText={`+ Add expense`}
      open={open}
      onOpenChange={setOpen}
    >
      <ExpenseForm form={form} handleSubmit={onSubmit} />
    </DialogModal>
  );
};
