'use client'

import { LucideProps } from 'lucide-react'
import { icons } from 'lucide-react'
import { cn } from '@/utils/utils'

interface IconProps extends LucideProps {
  name: keyof typeof icons
}

const Icon = ({ name, color, size, strokeWidth = 2, className }: IconProps) => {
  const LucideIcon = icons[name]

  if (!LucideIcon) return null

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      className={cn('', className)}
    />
  )
}

export default Icon
