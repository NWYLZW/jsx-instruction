import * as __Runtime__ from 'react/jsx-runtime'

import { instructionResolve } from './utils'

const Runtime = __Runtime__ as {
  jsx(type: any, props: any, key: any): any
  jsxs(type: any, props: any, key: any): any
  Fragment: any
}

export function jsxs(type: any, props: any, key: any) {
  const [nProps, wrap] = instructionResolve(props)
  const JSXElementCallback = Runtime.jsxs.bind(Runtime, type, nProps, key)
  return wrap ? wrap(JSXElementCallback, nProps) : JSXElementCallback()
}

export function jsx(type: any, props: any, key: any) {
  const [nProps, wrap] = instructionResolve(props)
  const JSXElementCallback = Runtime.jsx.bind(Runtime, type, nProps, key)
  return wrap ? wrap(JSXElementCallback, nProps) : JSXElementCallback()
}

export const Fragment = Runtime.Fragment
