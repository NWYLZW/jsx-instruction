export type PickWithType<T, Type> = {
  [K in keyof T
    as Type extends Type ? (
      Type extends Function
        ? [Type] extends [T[K]] ? K : never
        : [T[K]] extends [Type] ? K : never
    ) : never
  ]: T[K]
}
