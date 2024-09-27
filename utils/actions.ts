'use server';
import { prisma } from '@/utils/db';
import { getUserByClerkID } from './auth';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

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

export const newTransaction = async (data) => {
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

  return NextResponse.json({ data: transaction });
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

export const deleteTransaction = async (id: String) => {
  await prisma.transaction.delete({ where: { id: id } });
  console.log('transaction deleted: ID: ', id);
  revalidatePath('/expenses');
};

export const updateTransaction = async (formData) => {
  const transaction = await prisma.transaction.update({
    where: { id: formData.id },
    data: {
      userId: formData.id,
      title: formData.title,
      amount: formData.amount,
      monthlyDueDate: formData.monthlyDueDate,
      description: formData.description,
      category: formData.category,
    },
  });
};
