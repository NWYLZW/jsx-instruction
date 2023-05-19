import type { PickWithType } from './type'

export interface InstructionMap {
  stop: (event: {
    stopPropagation(): void
  }) => void | Promise<void>
}

export type Instructor<T> =
  & T
  & (
    keyof InstructionMap extends (infer I extends keyof InstructionMap)
      ? keyof PickWithType<T, InstructionMap[I]> extends (infer K extends keyof T)
        ? {
          [KK in K as `${KK & string}:${I & string}`]: T[KK]
        }
        : {}
      : {}
  )
