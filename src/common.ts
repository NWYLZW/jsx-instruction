import type { Instruction } from './index'
import { defineInstruction, ExcludePropSymbol } from './index'

declare module 'jsx-instruction' {
  interface InstructionMap {
    number: Instruction<string | boolean | bigint, false, number | string>
    string: Instruction<unknown, false, string>
    boolean: Instruction<unknown | 'yes' | 'no' | 'y' | 'n', false, boolean>
    trim: Instruction<string, false, string>
    stop: Instruction<
      (e: { stopPropagation(): void }) => void | Promise<void>
    >
    prevent: Instruction<
      (e: { preventDefault(): void }) => void | Promise<void>
    >
    $if: Instruction<unknown, true, unknown>
  }
}

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
defineInstruction('string', [originalValue => originalValue.toString()])
defineInstruction('boolean', [originalValue => {
  if (typeof originalValue === 'string') {
    return ['yes', 'y'].includes(originalValue)
  }
  return Boolean(originalValue)
}])

defineInstruction('trim', [originalValue => originalValue.trim()])
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

defineInstruction('$if', [(v, k, setWrap) => {
  setWrap((f, props) => {
    let cond = v
    if (k !== '$if') {
      cond = props[k.slice(4)] === v
    }
    return cond ? f() : null
  })
  return ExcludePropSymbol
}, { wrap: true }], true)
