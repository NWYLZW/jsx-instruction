import type { Instruction } from './index'
import { defineInstruction } from './index'

declare module 'jsx-instruction' {
  interface InstructionMap {
    number: Instruction<string | boolean | bigint, false, number | string>
    stop: Instruction<
      (e: { stopPropagation(): void }) => void | Promise<void>
    >
    prevent: Instruction<
      (e: { preventDefault(): void }) => void | Promise<void>
    >
  }
}

defineInstruction('stop', [func => e => {
  if (e.stopPropagation && typeof e.stopPropagation === 'function') {
    e.stopPropagation()
  }
  return func(e)
}])

defineInstruction('prevent', [func => e => {
  if (e.preventDefault && typeof e.preventDefault === 'function') {
    e.preventDefault()
  }
  return func(e)
}])

defineInstruction('number', [originalValue => {
  if (typeof originalValue === 'string') {
    const num = Number(originalValue)
    if (Number.isNaN(num)) {
      return originalValue
    }
    return num
  }
  if (typeof originalValue === 'boolean') {
    return originalValue ? 1 : 0
  }
  if (typeof originalValue === 'bigint') {
    return Number(originalValue)
  }
  return originalValue
}])
