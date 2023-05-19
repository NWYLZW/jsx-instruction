import type { PickWithType } from 'jsx-instruction/type'
import { describe, expectTypeOf, it, test } from 'vitest'

describe('Type', () => {
  it('should test PickWithType', () => {
    type PickTarget = {
      a: string
      b: number
      c: boolean
      d(): void
      e(): void | Promise<void>
      f(a: string): void
      g<T>(a: T): void
      h(a: number): void
    }
    expectTypeOf({ a: '' }).toMatchTypeOf<PickWithType<PickTarget, string>>()
    // @ts-expect-error
    expectTypeOf({ a: '' }).toMatchTypeOf<PickWithType<PickTarget, number>>()

    expectTypeOf({
      d() { },
      e() { },
      f() { },
      g() { },
      h() { }
    }).toMatchTypeOf<PickWithType<PickTarget, Function>>()
    expectTypeOf({} as unknown as {
      d(): void
      e(): void | Promise<void>
      f(a: string): void
      g<T>(a: T): void
      h(a: number): void
    }).toMatchTypeOf<PickWithType<PickTarget, (...args: any[]) => void>>()
    expectTypeOf({} as unknown as {
      h(a: number): void
    }).toMatchTypeOf<PickWithType<PickTarget, (a0: number) => void>>()
    expectTypeOf({} as unknown as {
      d(): void
      f(a: string): void
      g<T>(a: T): void
      // @ts-expect-error
    }).toMatchTypeOf<PickWithType<PickTarget, (...args: any[]) => void>>()

    type StringAndNumber = PickWithType<PickTarget, string | number>
    expectTypeOf({ a: '', b: 1 }).toMatchTypeOf<StringAndNumber>()
  })
  test('pass to PickWithType generic type is extends to `Target[K]`', () => {
    type PickTarget = {
      a: { b: string, c: number }
      b(a: { b: number, c: string }): void
    }
    expectTypeOf({} as unknown as {
      // @ts-expect-error
    }).toMatchTypeOf<PickWithType<PickTarget, { b: string }>>()
    expectTypeOf({} as unknown as {
      a: { b: string, c: number }
    }).toMatchTypeOf<PickWithType<PickTarget, { b: string }>>()
    expectTypeOf({} as unknown as {
      // @ts-expect-error
    }).toMatchTypeOf<PickWithType<PickTarget, (a: { b: number }) => void>>()
    expectTypeOf({} as unknown as {
      b(a: { b: number, c: string }): void
    }).toMatchTypeOf<PickWithType<PickTarget, (a: { b: number }) => void>>()
  })
})
