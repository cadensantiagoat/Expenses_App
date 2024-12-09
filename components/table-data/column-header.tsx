import { cn } from '@/utils/utils'
import { Column } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  align?: string
}

export function ColumnHeader<TData, TValue>({
  column,
  title,
  className,
  align,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const classes = {
    wrapper: align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : '',
    button: align === 'right' ? 'px-0 ' : align === 'center' ? 'justify-center' : '-ml-3',
  }

  return (
    <div className={cn('flex items-center space-x-2', classes.wrapper)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className={cn('h-8 data-[state=open]:bg-accent', classes.button)}
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <CaretSortIcon className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
