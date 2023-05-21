import type { Instruction } from 'jsx-instruction'

declare module 'jsx-instruction' {
  interface InstructionMap {
    stop: Instruction<
      (e: { stopPropagation(): void }) => void | Promise<void>
    >
    prevent: Instruction<
      (e: { preventDefault(): void }) => void | Promise<void>
    >
  }
}
