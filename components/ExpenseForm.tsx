'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createNewTransaction } from '@/utils/api';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from './ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Schema for form validation (reference: https://zod.dev/?id=basic-usage)
const formSchema = z.object({
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

// Since FormField uses a CONTROLLED COMPONENT, we must provide default values.
// Reference: https://react-hook-form.com/docs/usecontroller to learn more about controlled components

export function ExpenseForm() {
  // 1. Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      amount: 0,
  // category: '', Category's default value is defined in the SELECT
      
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values. This will be type-safe and validated.
    console.log('Values collected from form: ', values);

    // call API method
    // use .then() and .catch() because API returns a promise
    createNewTransaction(values).then((res) => {
      console.log("SUCCESS: transaction added to database.", res)
    }).catch((error) => {
      console.log("ERROR: ", error)
    })

    // Cleanup and possibly redirect
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* NAME (Example of Input type='text' used inside of FORM component) */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormDescription>Name your expense anything you like.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION (Example of Textarea used inside of FORM component) */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Optional" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CATEGORY (Example of SELECT used inside of FORM component) */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category for this expense." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Need add new category functionality, consider the Combobox component
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* AMOUNT (Example of Input type='number' used inside of FORM component */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-auto">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Need to implement currency formatting</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DUE DATE (Example of Datepicker (comprised of POPOVER and CALENDAR components) used inside of FORM component) */}
        <FormField
          control={form.control}
          name="monthlyDueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Payment Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the day your payment is due each month.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}