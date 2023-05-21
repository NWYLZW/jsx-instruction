import 'jsx-instruction/common'

import type { Instructor } from 'jsx-instruction'
import { describe, expectTypeOf, it } from 'vitest'

describe('Instructor', () => {
  describe('type', () => {
    it('should check common instruction is attached and its type is right', () => {
      type T0 = Instructor<{
        foo: number
        bar: string
        onClick?(event: MouseEvent): void | Promise<void>
        onPress?(event: TouchEvent): void
      }>
      expectTypeOf({} as unknown as T0['onClick']).toEqualTypeOf<T0['onClick:stop']>()
      expectTypeOf({} as unknown as T0['onPress']).toEqualTypeOf<T0['onPress:stop']>()
      type T1 = keyof T0
      expectTypeOf({} as unknown as true).toEqualTypeOf<
        'foo' extends T1 ? true : false
      >()
      expectTypeOf({} as unknown as false).toEqualTypeOf<
        'foo:stop' extends T1 ? true : false
      >()
    })
  })
})
