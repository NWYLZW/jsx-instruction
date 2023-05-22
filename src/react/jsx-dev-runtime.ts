import * as __Runtime__ from 'react/jsx-dev-runtime'

import { instructors } from '../index'

const Runtime = __Runtime__ as {
  jsxs(type: any, props: any, key: any): any
  jsxDEV(type: any, props: any, key: any, isStaticChildren: any, source: any, self: any): any
  Fragment: any
}

export function jsxs(type: any, props: any, key: any) {
  return Runtime.jsxs(type, props, key)
}

export function jsxDEV(type: any, props: any, key: any, isStaticChildren: any, source: any, self: any) {
  const propsWrap = {} as Record<string, any>
  for (const key in props) {
    let match = false
    Object.entries(instructors)
      .forEach(([name, instruction]) => {
        if (
          (instruction.isPrev && key.startsWith(name + ':')) ||
          (!instruction.isPrev && key.endsWith(':' + name))
        ) {
          const originalKey = instruction.isPrev
            ? key.slice(name.length + 1)
            : key.slice(0, key.length - name.length - 1)
          propsWrap[originalKey] = instruction(props[key])
          match = true
        }
      })
    if (!match)
      propsWrap[key] = props[key]
  }
  return Runtime.jsxDEV(type, propsWrap, key, isStaticChildren, source, self)
}

export const Fragment = Runtime.Fragment
