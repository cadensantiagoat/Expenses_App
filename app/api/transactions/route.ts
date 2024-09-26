import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
// import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const user = await getUserByClerkID();
  const data = await req.json();

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

  // Use revalidatePath once displaying data.
  // revalidatePath('/home')
  return NextResponse.json({ data: transaction });
};
