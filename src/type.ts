export type PickWithType<T, Type> = {
  [K in keyof T
    as Type extends Type ? (
      Type extends Function
        ? [Type] extends [T[K]] ? K : never
        : [T[K]] extends [Type] ? K : never
    ) : never
  ]: T[K]
}

export type U2I<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type L2T<L, LAlias = L, LAlias2 = L> = [L] extends [never]
  ? []
  : L extends infer LItem
    ? [LAlias, ...L2T<Exclude<LAlias2, LItem>, LAlias>]
    : never
