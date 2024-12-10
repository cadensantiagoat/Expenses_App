'use client'

import Icon from '@/components/Icon'
import { cn } from '@/utils/utils'

interface Props {
  status: boolean
  className?: string
}

const colors = {
  paid: '#009200',
  unpaid: '#f2b949',
}

export const StatusChip = ({ status, className }: Props) => {
  const color = status ? colors.paid : colors.unpaid

  return (
    <div
      className={cn('rounded-2xl inline-flex items-center gap-1.5 pl-2.5 pr-3 py-0.5', className)}
    >
      <Icon name={status ? 'CircleCheckBig' : 'CircleAlert'} size={15} color={color} />
    </div>
  )
}
