import type { PickWithType, U2I } from './type'

export interface InstructionItf {}

export interface InstructionDesc<
  IsPrev extends boolean = false,
  CT = never,
  Exclude extends string = never,
> {
  /**
   * @default false
   */
  isPrev?: IsPrev
  exclude?: Exclude[]
  convert?: CT
}

export type Instruction<
  T,
  IsPrev extends boolean = false,
  CT = never,
  Exclude extends string = never,
> =
  & ((t: T) => [CT] extends [never] ? T : CT)
  & InstructionItf
  & InstructionDesc<IsPrev, CT, Exclude>

export const instructors = {} as Record<string, Instruction<unknown>>

export interface DefineInstruction {
  // <
  //   N extends keyof InstructionMap,
  //   I extends Instruction<any> = InstructionMap[N],
  //   T = I extends Instruction<infer IT> ? IT : never,
  //   IsPrev extends Instruction<any>['isPrev'] = I['isPrev'],
  //   CT = I['convert'],
  //   Exclude extends Instruction<any>['exclude'][number] = I['exclude'][number],
  // >(
  //   name: N,
  //   instruction: Instruction<T, IsPrev, CT, Exclude>,
  //   isPrev?: IsPrev,
  // ): void
  <
    N extends keyof InstructionMap,
    // @ts-ignore
    I extends Instruction<any> = InstructionMap[N],
    T = I extends ((t: infer IT) => any) ? IT : never,
  >(
    name: N,
    instruction:
      | [
        target: (t: T) => [I['convert']] extends [never] ? T : I['convert'],
        opts?: InstructionItf & InstructionDesc<I['isPrev'], I['convert'], I['exclude'][number]>
      ],
    isPrev?: I['isPrev']
  ): void
}

export const defineInstruction: DefineInstruction = (name, [target, opts], isPrev) => {
  const instruction = target as Instruction<unknown>
  instruction.isPrev = isPrev
  instruction.exclude = opts?.exclude
  // @ts-ignore
  instructors[name] = target
}

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
          propsWrap[originalKey] = instruction(props[key])
          match = true
        }
      })
    if (!match)
      propsWrap[key] = props[key]
  }
  return propsWrap
}

export interface InstructionMap {}

export type InstructionFieldDefine<
  T, CT,
  K extends keyof T,
  IKey,
  IsPrev,
> = {
  [KK in K
    as [IsPrev] extends [true]
    ? `${IKey & string}:${KK & string}`
    : `${KK & string}:${IKey & string}`
  ]: [CT] extends [never]
    ? T[KK]
    : CT
}

export type GetInstructionMeta<K> = K extends keyof InstructionMap
  ? InstructionMap[K] extends infer I
    ? I extends Instruction<infer IT, infer IsPrev, infer ICT, infer E>
      ? [I, IT, IsPrev, ICT, E]
      : never
    : never
  : never

export type InstructorCalc<T> = U2I<
  /**
   * map all instructions, and infer instruction metadata
   */
  keyof InstructionMap extends (infer IKey extends keyof InstructionMap) ? IKey extends IKey
    ? GetInstructionMeta<IKey> extends [
        infer _I,
        infer IT, infer IsPrev, infer ICT, infer E
      ]
      /**
       * define instruction field
       */
      ? InstructionFieldDefine<
        T, ICT,
        /**
         * exclude not match target field
         */
        Exclude<keyof PickWithType<T, IT>, E>,
        IKey,
        IsPrev
      >
      : {}
  : {} : {}
>

export type Instructor<T> =
  & T
  & InstructorCalc<T>
