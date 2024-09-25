import { auth } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Blockquote, H1, P } from '@/components/ui/typography';

export default async function LandingPage() {
  const { userId } = await auth();

  let href = userId ? '/home' : '/new-user';

  return (
    <div className="h-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 md:items-center sm:items-start">
        <H1>Expense Tracker</H1>
        <Blockquote>The ultimate experience for managing your bills.</Blockquote>
        <P>
          {userId
            ? 'Welcome back!'
            : 'The ultimate tool for managing your monthly expenses.'}
        </P>
        <Link href={href}>
          <Button>{userId ? 'Home' : 'Get Started'}</Button>
        </Link>
      </main>
    </div>
  );
}
