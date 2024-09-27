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
  buttonText?: string;
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {buttonText ? (
        <DialogTrigger asChild>
          <Button variant="outline">{buttonText}</Button>
        </DialogTrigger>
      ) : null}

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

type modalProps = {
  title: string;
  description: string;
  children: any;
  open?: boolean;
  setOpen?: any;
};

export function Modal({
  title,
  description,
  open = true,
  setOpen,
  children,
}: modalProps) {
  return (
    <Dialog open={open} modal defaultOpen onOpenChange={setOpen}>
      <DialogContent forceMount className="sm:max-w-[425px]">
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
