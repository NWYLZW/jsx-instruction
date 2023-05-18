# JSX Instruction

## common

* stop.plugin.ts
```typescript
import { defineInstruction } from 'jsx-instruction'

declare module 'jsx-instruction' {
  interface InstructionMap {
    stop(event: MouseEvent): void | Promise<void>
  }
}

defineInstruction('stop', event => {
  if (!event instanceof MouseEvent) return
  event.stopPropagation()
})
```
* App.tsx
```typescript jsx
import { Instructor } from 'jsx-instruction'
interface FooProps {
  onClick?(event: MouseEvent): void | Promise<void>
}

declare function Foo(props: Instructor<FooProps>): JSX.Element

const App = () => <>
  <Foo onClick:stop={noop} />
</>
```

## Component wrapper

* component-lib.modifier.ts
```typescript
import { before } from 'jsx-instruction'
before('tdesign', 'stop', (event, func) => func(event.originalEvent))
```
* App.tsx
```typescript jsx
import { Instructor } from 'jsx-instruction'
import { Button } from 'tdesign'

const App = () => <>
  <Instructor:tdesign
    comp={Button}
    onClick:stop={noop}
  />
</>
```

## HTML tag
```typescript jsx
import 'jsx-instruction/html'

const App = () => <>
  <button onClick:stop={noop} />
</>
```
