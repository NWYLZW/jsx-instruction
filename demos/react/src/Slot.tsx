declare const SlotsNameSymbol: unique symbol

type TemplateSlotField<B = never> = React.ReactNode | true | ((binding: B) => React.ReactNode)

type TemplateProps<N extends string, B = never> = {
  [K in `slots:${N}`]?: TemplateSlotField<B>
}

type TemplateElement<N extends string, B = never> = React.ReactElement<TemplateProps<N, B>, Template>

declare type Template = {
  <N extends string, T extends `slots:${N}` | (string & {}), B = never>(
    type: T,
    opts: T extends `slots:${string}`
      ? TemplateSlotField<B>
      : never
  ): TemplateElement<N, B> & { [SlotsNameSymbol]: N }
  <N extends string, B = never>(
    props: TemplateProps<N, B>
  ): TemplateElement<N, B> & { [SlotsNameSymbol]: N }
}

declare const Template: Template

declare function Foo(props: {
  children: TemplateElement<'header'>
}): React.ReactElement

declare function UserCard(props: {
  children: TemplateElement<'header', { name: string }> | React.ReactNode
}): React.ReactElement

const Bar = <>
  <Foo>
    <Template slots:header />
  </Foo>
  <UserCard>
    {Template('slots:header', u => <>{u.name}</>)}
    <Template slots:header={(u: { name: string }) => <>{u.name}</>} />
  </UserCard>
</>
