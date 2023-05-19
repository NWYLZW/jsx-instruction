import * as __Runtime__ from 'react/jsx-runtime'

const Runtime = __Runtime__ as {
  jsx(type: any, props: any, key: any): any
  jsxs(type: any, props: any, key: any): any
  Fragment: any
}

export function jsx(type: any, props: any, key: any) {
  console.log('jsx', type, props, key)
  return Runtime.jsx(type, props, key)
}

export function jsxs(type: any, props: any, key: any) {
  console.log('jsxs', type, props, key)
  return Runtime.jsxs(type, props, key)
}

export const Fragment = Runtime.Fragment
