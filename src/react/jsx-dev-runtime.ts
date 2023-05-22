import * as __Runtime__ from 'react/jsx-dev-runtime'

import { propsResolver } from '../index'

const Runtime = __Runtime__ as {
  jsxs(type: any, props: any, key: any): any
  jsxDEV(type: any, props: any, key: any, isStaticChildren: any, source: any, self: any): any
  Fragment: any
}

export function jsxs(type: any, props: any, key: any) {
  return Runtime.jsxs(type, propsResolver(props), key)
}

export function jsxDEV(type: any, props: any, key: any, isStaticChildren: any, source: any, self: any) {
  return Runtime.jsxDEV(type, propsResolver(props), key, isStaticChildren, source, self)
}

export const Fragment = Runtime.Fragment
