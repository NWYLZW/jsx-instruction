import * as __Runtime__ from 'react/jsx-runtime'

import { propsResolver } from '../index'

const Runtime = __Runtime__ as {
  jsx(type: any, props: any, key: any): any
  jsxs(type: any, props: any, key: any): any
  Fragment: any
}

export function jsx(type: any, props: any, key: any) {
  return Runtime.jsx(type, propsResolver(props), key)
}

export function jsxs(type: any, props: any, key: any) {
  return Runtime.jsxs(type, propsResolver(props), key)
}

export const Fragment = Runtime.Fragment
