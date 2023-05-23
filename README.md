# JSX Instruction

| EN: [English](./README.md)
| ZH: [中文](readme/README.zh_CN.md)

Based on the support for [TypeScript namespaced-jsx-attributes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1-rc/#namespaced-jsx-attributes), this repository implements a custom directive system for components.

In JSX, you can use the postfix directive `onClick:stop={noop}` to prevent event bubbling using the `stop` directive.

You can also use the syntax `foo:boolean='y'` to set the boolean type data for `foo` using the `boolean` directive.

## How to Use

### Installation

```bash
npm install jsx-instruction
# or
yarn add jsx-instruction
# or
pnpm add jsx-instruction
```

### Configuration

Currently, only React is supported, so we'll use React as an example:

* `tsconfig.json`: Configure `jsxImportSource` to `jsx-instruction/react`
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "jsx-instruction/react"
  }
}
```
* `App.ts`：Import types and default instruction
```typescript jsx
import 'jsx-instruction/common'

import type { } from 'jsx-instruction/react'
```

### Use

```typescript jsx
export function Foo() {
  return <div onClick={noop}>
    <button onClick={noop}>
      click will bubble
    </button>
    <button onClick:stop={noop}>
      click will not bubble
    </button>
  </div>
}
```
## Custom Directives

When it comes to directives, there are no specific restrictions on where they should be placed. They can be placed before or after an attribute. Commonly used directives may include:

* `attr:stop`
* `model:attr`

Directives function similarly to decorators in the ECMAScript standard. They can modify a property that needs to be passed into a component. (Alternatively, they can modify the return object of the current component, although this design and implementation have not been done yet, similar to Vue's `v-loading` directive.)

## common

* stop.plugin.ts
```typescript
import { defineInstruction, Instruction } from 'jsx-instruction'

declare module 'jsx-instruction' {
  interface InstructionMap {
    stop: Instruction<
      (e: { stopPropagation(): void }) => void | Promise<void>
    >
  }
}

defineInstruction('stop', [func => e => {
  if (e.stopPropagation && typeof e.stopPropagation === 'function') {
    e.stopPropagation()
  }
  return func(e)
}])
```
