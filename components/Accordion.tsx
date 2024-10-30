import * as Accordion from '@radix-ui/react-accordion'

const Collapsible = ({
  children,
  defaultValue,
  showMultiple = false,
}: {
  type: string
}) => {
  return (
    <Accordion.Root
      type={showMultiple ? 'multiple' : 'single'}
      defaultValue={defaultValue}
      collapsible
    >
      {children}
    </Accordion.Root>
  )
}

const CollapsibleContent = ({ value, trigger, children }) => {
  return (
    <Accordion.Item value={value}>
      <Accordion.Header asChild>
        <Accordion.Trigger asChild>{trigger}</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>{children}</Accordion.Content>
    </Accordion.Item>
  )
}

Collapsible.Content = CollapsibleContent

export default Collapsible
