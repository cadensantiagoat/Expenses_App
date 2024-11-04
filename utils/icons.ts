import { createElement } from 'react'
import * as LucideReact from 'lucide-react'

export const ICONS = [
  { id: 'House' },
  { id: 'HandMetal' },
  { id: 'ThumbsDown' },
  { id: 'ThumbsUp' },
  { id: 'Angry' },
  { id: 'Annoyed' },
  { id: 'Utensils' },
  { id: 'Coffee' },
  { id: 'Mountain' },
  { id: 'Wrench' },
  { id: 'Fuel' },
  { id: 'Bitcoin' },
  { id: 'Atom' },
  { id: 'KeyRound' },
  { id: 'ShoppingCart' },
  { id: 'Dumbbell' },
  { id: 'Wallet' },
  { id: 'Youtube' },
]

// TO-DO: EXPLICITLY cache this function
export const createIconList = (array: { id: string }[]) => {
  return array.map((item) => ({
    ...item,
    icon: createElement<Object>(LucideReact[item.id], { size: 16 }),
  }))
}
