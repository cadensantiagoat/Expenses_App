import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/utils'
import Icon from '@/components/Icon'

const chipVariants = cva(
  'inline-flex items-center rounded-2xl border px-2.5 py-1 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary-foreground text-primary hover:bg-primary-foreground/80',
        color:
          'border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)


export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
        iconName?: string           
        title: string,
        color?: string
    }

const Chip = ({ className, variant, iconName, color, title, ...props }: ChipProps) => {

    // const iconColor = color ? '#0f172a' : '#f8fafc' 

  return <div  className={cn(chipVariants({ variant }), className)} {...props}>
    {iconName && (<Icon name={iconName} size={16} color={'#0f172a'} className='mr-2'/>)}
    {title}
  </div>
}

export { Chip, chipVariants }
