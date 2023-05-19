import * as __Runtime__ from 'react/jsx-dev-runtime'

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
    if (key.endsWith(':stop')) {
      propsWrap[key.replace(':stop', '')] = (e: MouseEvent) => {
        e.stopPropagation()
        props[key](e)
      }
    } else {
      propsWrap[key] = props[key]
    }
  }
  // console.log('jsxDEV', type, propsWrap, key, isStaticChildren, source, self)
  return Runtime.jsxDEV(type, propsWrap, key, isStaticChildren, source, self)
}

export const Fragment = Runtime.Fragment
