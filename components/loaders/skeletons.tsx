import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const SkeletonCard = () => {
  return (
    <Card className="h-full min-h-[362px] w-full p-3">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </Card>
  );
};

export const SkeletonText = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-4 w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export const SkeletonOverview = () => {
  return (
    <Card className="h-[202px] flex items-center justify-evenly w-full p-3">
      <div className="flex items-center">
        <Skeleton className="h-[150px] w-[150px] rounded-full" />
      </div>
      <div className='shrink-0 bg-border w-[1px] h-[75%]' />
      <div className='flex flex-col justify-evenly h-full max-w-[240px] p-3 pl-4'>
      <Skeleton className="h-4 w-[240px]" />
      <Skeleton className="h-4 w-[148px]" />
      <Skeleton className="h-4 w-[148px]" />
      <Skeleton className="h-4 w-[91px]" />
        </div>
    </Card>
  );
};