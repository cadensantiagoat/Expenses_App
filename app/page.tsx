import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function LandingPage() {
  const { userId } = await auth();

  let href = userId ? '/home' : '/new-user';

  return (
    <div className="h-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 md:items-center sm:items-start">
        <h1 className="text-3xl">Expense Tracker</h1>
        <p className="text-black/60">
          {userId
            ? 'Welcome back!'
            : 'The ultimate tool for managing your monthly expenses.'}
        </p>
        <Link href={href}>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-l">
            {userId ? 'Home' : 'Get Started'}
          </button>
        </Link>
      </main>
    </div>
  );
}
