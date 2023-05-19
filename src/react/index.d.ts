import type { InstructorCalc } from 'jsx-instruction'
import type React from 'react'

declare module 'react' {
  interface AnchorHTMLAttributes<T> extends InstructorCalc<React.AnchorHTMLAttributes<T>> {}
  interface ButtonHTMLAttributes<T> extends InstructorCalc<React.ButtonHTMLAttributes<T>> {}
}
