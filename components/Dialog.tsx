'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type props = {
  title: string;
  description: string;
  buttonText: string;
  children: any;
  open: boolean;
  setOpen: any;
};

// TO-DO: Dialog doesn't reset error state on close

export function DialogModal({
  title,
  description,
  buttonText,
  open,
  setOpen,
  children,
}: props) {
  //   const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

// ------------------------------------------------------------------
// GOOD EXAMPLE OF A SIMPLE FORM

// function ProfileForm({ className }: React.ComponentProps<'form'>) {
//   return (
//     <form className={cn('grid items-start gap-4', className)}>
//       <div className="grid gap-2">
//         <Label htmlFor="email">Email</Label>
//         <Input type="email" id="email" defaultValue="shadcn@example.com" />
//       </div>
//       <div className="grid gap-2">
//         <Label htmlFor="username">Username</Label>
//         <Input id="username" defaultValue="@shadcn" />
//       </div>
//       <Button type="submit">Save changes</Button>
//     </form>
//   );
// }
