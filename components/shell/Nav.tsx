'use client';

import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="h-[65px] border-b border-default-50 flex justify-end items-center px-6 gap-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};

export default Nav;
