import type * as React from 'react'

import type { InstructorCalc } from '../index'

declare module 'react' {
  interface AnchorHTMLAttributes<T> extends InstructorCalc<React.AnchorHTMLAttributes<T>> {}
  interface ButtonHTMLAttributes<T> extends InstructorCalc<React.ButtonHTMLAttributes<T>> {}
}
