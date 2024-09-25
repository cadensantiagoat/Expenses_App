import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (data) => {
  const user = await getUserByClerkID();

  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      title: data.name,
      amount: data.amount,
      monthlyDueDate: 1,
      description: data.description,
      category: data.caegory,
    },
  });

  // revalidatePath('/home')
  return NextResponse.json({ data: transaction });
};
