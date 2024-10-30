'use client';

import Link from 'next/link';
import { H3 } from '../ui/typography';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const isActive = (path: string, route: string) => {
  if (route === '/dashboard') return path === '/dashboard';
  else return path.includes(route);
};

const links = [
  { route: '/dashboard', name: 'Home' },
  { route: '/dashboard/expenses', name: 'Expenses' },
];

const Side = () => {
  const path = usePathname();
  const activeClass = 'bg-foreground hover:bg-primary text-white';

  return (
    <div className="w-full h-full px-3 relative">
      <div className="mb-12">
        <figure className="w-[80px] pt-4">
          <H3>tracker</H3>
        </figure>
      </div>
      <div>
        {links.map((link) => (
          <div className="w-full" key={link.route}>
            <Link href={link.route}>
              <div
                className={`w-full h-full py-2 px-2 hover:bg-content1 rounded-lg ${
                  isActive(path, link.route) && activeClass
                }`}
              >
                {link.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full left-0 px-4">
        <Button variant="ghost">Sign Out</Button>
      </div>
    </div>
  );
};

export default Side;
