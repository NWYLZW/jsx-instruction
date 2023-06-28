import { instructors } from '../'

export const propsResolver = (props: any) => {
  const propsWrap = {} as Record<string, any>
  for (const key in props) {
    let match = false
    Object.entries(instructors)
      .forEach(([name, instruction]) => {
        if (
          (instruction.isPrev && key.startsWith(name + ':')) ||
          (!instruction.isPrev && key.endsWith(':' + name))
        ) {
          const originalKey = instruction.isPrev
            ? key.slice(name.length + 1)
            : key.slice(0, key.length - name.length - 1)
          propsWrap[originalKey] = instruction(props[key], key)
          match = true
        }
      })
    if (!match)
      propsWrap[key] = props[key]
  }
  return propsWrap
}
