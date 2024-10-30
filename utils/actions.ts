'use server';
import { prisma } from '@/utils/db';
import { getUserByClerkID } from './auth';
// import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// If you need to change the UI based on something that happened in the backend,
// you should just make an API call on the frontend. (onClick or useEffect)

// Problem: You cant respond back in server actions.

// type transaction = {
//     id: string,
//     userId: string,
//     title: string,
//     amount: string,
//     monthlyDueDate: 1,
//     description: string,
//     category: string,
//     createdAt: string,
//     updatedAt: string
//   };

// Need to find out if this is best method, and decide on proper error and success handling
export const newTransaction = async (data: any) => {
  const user = await getUserByClerkID();
  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      title: data.title,
      amount: data.amount,
      monthlyDueDate: 1,
      description: data.description,
      category: data.category,
    },
  });
  revalidatePath('/expenses');
  // return NextResponse.json({ data: transaction });
};

export const getTransactions = async () => {
  try {
    const user = await getUserByClerkID();
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
    });
    return JSON.parse(JSON.stringify(transactions));
  } catch (error) {
    return { error: error };
  }
};

export const deleteTransaction = async (id: string) => {
  await prisma.transaction.delete({ where: { id: id } });
  console.log('transaction deleted: ID: ', id);
  revalidatePath('/dashboard/expenses');
};

export const updateTransaction = async (transactionID: string, formData: any) => {
  const user = await getUserByClerkID();
  const transaction = await prisma.transaction.update({
    where: { id: transactionID },
    data: {
      userId: user.id,
      title: formData.title,
      amount: formData.amount,
      monthlyDueDate: 1,
      description: formData.description,
      category: formData.category,
    },
  });
  console.log('transaction UPDATED: ID: ', transaction);
  redirect('/expenses');
};
