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
  wrap?: true
}

export const ExcludePropSymbol = Symbol('ExcludeProp')

export type WrapFunc = (JSXElementCallback: Function) => any

export type Instruction<
  T,
  IsPrev extends boolean = false,
  CT = never,
  Exclude extends string = never,
> =
  & ((t: T, key?: string, setWrap?: (w: WrapFunc) => void) => [CT] extends [never] ? T : CT)
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
  <N extends keyof InstructionMap>(
    name: N,
    instruction:
      | [
        target: InstructionMap[N],
        opts?: InstructionItf & Omit<InstructionDesc<
          InstructionMap[N]['isPrev'],
          InstructionMap[N]['convert'],
          InstructionMap[N]['exclude'][number]
        >, 'isPrev' | 'convert'>
      ],
    isPrev?: InstructionMap[N]['isPrev']
  ): void
}

export const defineInstruction: DefineInstruction = (name, [target, opts], isPrev) => {
  const instruction = target as Instruction<unknown, boolean>
  instruction.isPrev = isPrev
  for (const key in opts) {
    // @ts-ignore
    instruction[key] = opts[key]
  }
  // @ts-ignore
  instructors[name] = target
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
    ? `${IKey & string}:${KK & string}` | (IKey & string)
    : `${KK & string}:${IKey & string}`
  ]?: [CT] extends [never]
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
