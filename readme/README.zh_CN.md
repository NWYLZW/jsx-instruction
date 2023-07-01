# JSX Instruction

| EN: [English](../README.md)
| ZH: [中文](./README.zh_CN.md)

基于 [TypeScript namespaced-jsx-attributes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1-rc/#namespaced-jsx-attributes) 的支持，本仓库实现了一套组件的自定义指令系统。

在 JSX 中，可以通过后缀指令 `onClick:stop={noop}` 的方式，通过 `stop` 指令来阻止事件冒泡。

也可以使用 `foo:boolean='y'` 的方式，通过 `boolean` 指令来为 `foo` 设置 `boolean` 类型的数据。

## 如何使用

### 安装

```shell
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

建议关于指令的作用，可以根据指令的位置来决定。在这里推荐进行如下的指令分类：
* `i-show={condition}`：作为一个单指令，判断传入的变量，并且通过 `display` 来控制元素的显示与隐藏。
* `attr:stop={func}`：作为一个修饰指令，对传入的函数进行包装，使其在执行时，会先执行 `stopPropagation`。
* `i-model:attr={props}`：作为一个描述 Attr 的指令，从 props 中取出 `attrValue` 与 `onAttrChange`，并且将其绑定到 `attr` 上。

### 自定义属性预处理器

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

### 控制流

```typescript jsx
function App() {
  return <>
    <div $if={true}>
      show
    </div>
    <div $else>
      show
    </div>
    <div $if={v === 1}>
      hide
    </div>
    <div $else-if={v === 2}>
      hide
    </div>
    <div $else>
      hide
    </div>
  </>
}
```

### 循环

```typescript jsx
function App() {
  return <>
    <div $for={[1, 2, 3]} $key:self>
      {item => item}
    </div>
    <div $for={[o0, o1, o2]} $key:index>
      {item => item.label}
    </div>
    <div $for={[o0, o1, o2]} $key='id'>
      {item => item.label}
    </div>
    <div $for={[o0, o1, o2]} $key={o => o.id}>
      {item => item.label}
    </div>
    <Fragment $for={[o0, o1, o2]} $key={o => o.id}>
      <span>{item => item.label}</span>
      <span>{item => item.value}</span>
    </Fragment>
  </>
}
```

### 插槽

```typescript jsx
function App() {
  return <>
    <Card>
      <Template $slot:header>This is header slot</Template>
    </Card>

    <UserCard>
      {Template('$slot:header', user => <span style={{ color: 'red' }}>{user.name}</span>)}
      <Template $slot:header={user =>
        <span style={{ color: 'red' }}>{user.name}</span>
      }/>
    </UserCard>
  </>
}
```
