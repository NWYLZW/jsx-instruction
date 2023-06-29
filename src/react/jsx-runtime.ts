import * as __Runtime__ from 'react/jsx-runtime'

import { instructionResolve } from './utils'

const Runtime = __Runtime__ as {
  jsx(type: any, props: any, key: any): any
  jsxs(type: any, props: any, key: any): any
  Fragment: any
}

export function jsx(type: any, props: any, key: any) {
  return Runtime.jsx(type, instructionResolve(props), key)
}

export function jsxs(type: any, props: any, key: any) {
  return Runtime.jsxs(type, instructionResolve(props), key)
}

export const Fragment = Runtime.Fragment
