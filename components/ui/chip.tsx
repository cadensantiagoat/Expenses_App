import * as React from 'react'
import { cn } from '@/utils/utils'
import { pSBC } from '@/utils/color-converter'
import Icon from '@/components/Icon'

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  iconName?: string
  title: string
  color?: string
}

const defaultChipStyles = {
  baseClass:
    'inline-flex flex-nowrap items-center gap-1.5 rounded-lg text-xs border px-2.5 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  defaultClass: 'bg-primary-foreground text-primary hover:bg-primary-foreground/80',
  iconColor: '#0f172a',
}

const Chip = ({ className, iconName, color, title, ...props }: ChipProps) => {
  // Return chip with default styles
  if (color === 'default') {
    return (
      <div
        className={cn(defaultChipStyles.baseClass, defaultChipStyles.defaultClass)}
        {...props}
      >
          <Icon name={iconName} size={15} color={defaultChipStyles.iconColor} />
        {title}
      </div>
    )
  }

  // Return chip with computed colors 
  const lighterColor = pSBC(0.75, color) // color used for background
  const darkerColor = pSBC(-0.42, color) // color used for icon and text
  const colorStyles = {
    backgroundColor: lighterColor,
    borderColor: color,
    color: darkerColor,
  }

  return (
    <div className={cn(defaultChipStyles.baseClass, '')} {...props} style={colorStyles}>
      <Icon name={iconName} size={15} color={darkerColor} />
      {title}
    </div>
  )
}

export { Chip }
