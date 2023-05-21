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

export type InstructorCalc<T> = U2I<
  keyof InstructionMap extends (infer IKey extends keyof InstructionMap)
    ? IKey extends IKey
    ? InstructionMap[IKey] extends infer I
      ? I extends Instruction<infer IT, infer IsPrev, infer ICT, infer E>
        ? Exclude<keyof PickWithType<T, IT>, E> extends (infer K extends keyof T)
          ? {
            [KK in K
              as [IsPrev] extends [true]
                ? `${IKey & string}:${KK & string}`
                : `${KK & string}:${IKey & string}`
            ]: [ICT] extends [never]
              ? T[KK]
              : ICT
          }
          : {}
        : {}
      : {}
    : {}
    : {}
>

export type Instructor<T> =
  & T
  & InstructorCalc<T>
