import 'jsx-instruction/common'

import type { Instructor } from 'jsx-instruction'
// For WebStorm, it's needed to import `jsx-instruction/react` to get the type inference.
// Which is not support tsconfig.json#include.
import type { } from 'jsx-instruction/react'
import type { MouseEventHandler } from 'react'

function FooButton(props: Instructor<{
  onClick?: MouseEventHandler<HTMLButtonElement>
  onDoubleClick?: MouseEventHandler<HTMLButtonElement>
}>) {
  return <button {...props}>
    foo
  </button>
}

export default function App() {
  return <div onClick={(e) => {
    console.log('click', e.target)
  }}>
    <button onClick={() => {
      console.log('click')
    }}>
      click
    </button>
    <button onClick:stop={() => {
      console.log('click with stop')
    }}>
      click with stop
    </button>
    <FooButton onClick:stop={() => {
      console.log('click with stop')
    }} />
  </div>
}
