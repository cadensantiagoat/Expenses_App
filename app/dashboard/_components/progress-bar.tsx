'use cient'

import { useState, useEffect } from 'react'
import * as Progress from '@radix-ui/react-progress'
import { cn } from '@/utils/utils'

type Props = {
  value: number
  className?: string
}

const ProgressBar = ({ value, className }: Props) => {
  const [progress, setProgress] = useState(0)


  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <Progress.Root
      max={100}
      value={progress}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        className
      )}
    >
      <Progress.Indicator
        className='h-full w-full flex-1 bg-primary transition-all'
        style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
      />
    </Progress.Root>
  )
}

export default ProgressBar
