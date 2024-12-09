'use client'

import { FormControl, FormDescription, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/utils/utils'

const radioOptions = [
  {
    value: true,
    label: 'Auto pay enabled',
    description: 'This expense will be marked as paid on the due date.',
  },
  {
    value: false,
    label: 'Disabled',
    description: 'I will manually mark this expense as paid each month.',
  },
]

interface Props {
  onValueChange: () => void
  defaultValue: string
  value: boolean
}

export const RadioComponent = ({ onValueChange, defaultValue, value }: Props) => {
  return (
    <RadioGroup
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      className='grid grid-cols-2'
    >
      {radioOptions.map((option) => {
        return (
          <RadioItem
            key={option.label}
            value={option.value}
            label={option.label}
            description={option.description}
            active={value === option.value}
          />
        )
      })}
    </RadioGroup>
  )
}

type ItemProps = {
  value: boolean
  label: string
  description?: string
  active?: boolean
}

const RadioItem = ({ value, label, description, active }: ItemProps) => {
  const activeClass = active ? 'border-black bg-white' : ''
  return (
    <div
      className={cn(
        `grid grid-rows-[36px_auto] grid-cols-[36px_auto] border border-muted rounded-md p-2 items-center bg-muted`,
        activeClass
      )}
    >
      <FormControl className='col-span-1 items-center justify-self-center'>
        <RadioGroupItem value={value}/>
      </FormControl>
      <FormLabel className='mt-0'>{label}</FormLabel>

      {/* <FormDescription className='col-start-2 pb-2 justify-self-start'>{description}</FormDescription> */}
    </div>
  )
}
