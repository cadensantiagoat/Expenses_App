import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const user = await getUserByClerkID();
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json({ transactions });
};

export async function POST(request: Request) {
  const user = await getUserByClerkID();
  const data = await request.json();

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

  // TO-DO: revalidatePath not working
  revalidatePath('/expenses');
  return NextResponse.json({ data: transaction });
}
