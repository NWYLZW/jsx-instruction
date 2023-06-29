import type { WrapFunc } from '../'
import { ExcludePropSymbol, instructors } from '../'

export const instructionResolve = (props: any) => {
  const instructorsEntries = Object.entries(instructors)

  let wrap: WrapFunc = undefined
  const nProps = {} as Record<string, any>
  for (const key in props) {
    let originalKey: string
    let instruction: typeof instructors[string]
    instructorsEntries
      .forEach(([name, cureInstruction]) => {
        if (
          (cureInstruction.isPrev && (
            key.startsWith(name + ':') || key === name
          ))
          || (!cureInstruction.isPrev && key.endsWith(':' + name))
        ) {
          originalKey = cureInstruction.isPrev
            ? key.slice(name.length + 1)
            : key.slice(0, key.length - name.length - 1)
          instruction = cureInstruction
        }
      })
    if (instruction) {
      const calcValue = instruction(props[key], key, w => wrap = w)
      if (calcValue !== ExcludePropSymbol) {
        nProps[originalKey!] = calcValue
      }
    } else {
      nProps[key] = props[key]
    }
  }
  return [nProps, wrap] as const
}
