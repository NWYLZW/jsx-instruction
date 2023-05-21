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
  & T
  & InstructionItf
  & InstructionDesc<IsPrev, CT, Exclude>

export interface InstructionMap {
}

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
       * exclude not match target field
       */
      ? Exclude<keyof PickWithType<T, IT>, E> extends (infer K extends keyof T)
        /**
         * define instruction field
         */
        ? InstructionFieldDefine<T, ICT, K, IKey, IsPrev>
        : {}
      : {}
  : {} : {}
>

export type Instructor<T> =
  & T
  & InstructorCalc<T>
