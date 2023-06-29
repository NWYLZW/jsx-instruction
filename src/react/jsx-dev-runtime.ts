import * as __Runtime__ from 'react/jsx-dev-runtime'

import { instructionResolve } from './utils'

const Runtime = __Runtime__ as {
  jsxs(type: any, props: any, key?: any): any
  jsxDEV(type: any, props: any, key?: any, isStaticChildren?: any, source?: any, self?: any): any
  Fragment: any
}

export function jsxs(type: any, props: any, key: any) {
  const [nProps, wrap] = instructionResolve(props)
  const JSXElementCallback = Runtime.jsxs.bind(Runtime, type, nProps, key)
  return wrap ? wrap(JSXElementCallback, nProps) : JSXElementCallback()
}

export function jsxDEV(type: any, props: any, key: any, isStaticChildren: any, source: any, self: any) {
  const [nProps, wrap] = instructionResolve(props)
  const JSXElementCallback = Runtime.jsxDEV.bind(Runtime, type, nProps, key, isStaticChildren, source, self)
  return wrap ? wrap(JSXElementCallback, nProps) : JSXElementCallback()
}

export const Fragment = Runtime.Fragment
