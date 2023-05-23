# JSX Instruction

| EN: [English](../README.md)
| ZH: [中文](./README.zh_CN.md)

基于 [TypeScript namespaced-jsx-attributes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1-rc/#namespaced-jsx-attributes) 的支持，本仓库实现了一套组件的自定义指令系统。

在 JSX 中，可以通过后缀指令 `onClick:stop={noop}` 的方式，通过 `stop` 指令来阻止事件冒泡。

也可以使用 `foo:boolean='y'` 的方式，通过 `boolean` 指令来为 `foo` 设置 `boolean` 类型的数据。

## 如何使用

### 安装

```bash
npm install jsx-instruction
# or
yarn add jsx-instruction
# or
pnpm add jsx-instruction
```

### 配置

目前只支持 react，所以我们以 react 为例：

* `tsconfig.json`：配置 `jsxImportSource` 为 `jsx-instruction/react`
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "jsx-instruction/react"
  }
}
```
* `App.ts`：引入类型与默认指令
```typescript jsx
import 'jsx-instruction/common'

import type { } from 'jsx-instruction/react'
```

### 使用

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

## 自定义指令

关于指令，指令所在的位置并无任何限制，它可以是 attribute 的前面，也可以是后面。常见的指令可能有：
* `attr:stop`
* `model:attr`

指令的作用比较类似一个在 ECMAScript 标准中的一个语法「装饰器」，他可以去修改一个需要传入组件中的属性。
（又或者是去修改当前的组件的返回对象，不过目前还没有进行该设计与实现，类似 Vue 中的 `v-loading`。）

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
