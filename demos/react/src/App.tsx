import 'jsx-instruction/common'

import type { Instructor } from 'jsx-instruction'
// For WebStorm, it's needed to import `jsx-instruction/react` to get the type inference.
// Which is not support tsconfig.json#include.
import type { } from 'jsx-instruction/react'
import React, { useState } from 'react'

export function DisplayValueType(props: Instructor<{ val?: any }>) {
  return <span>
    {typeof props.val}
  </span>
}

export function SpanWithVal(props: Instructor<{ val: any }> & {
  children?: React.ReactNode
}) {
  return <span>
    {props.children}
  </span>
}

export default function App() {
  const [cond, setCond] = useState(false)
  const [input, setInput] = useState('')
  return <>
    <h1>JSX Instruction</h1>
    <h2>Property Modifier</h2>
    <input value={input} onChange={e => setInput(e.target.value)}/>
    <br/>
    No modifier value type: <DisplayValueType val={input} />
    <br/>
    number modifier value type: <DisplayValueType val:number={input} />
    <br/>
    <h2>Event Modifier</h2>
    <div
      className='card'
      style={{
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 4
      }}
      onClick={() => alert('card clicked')}
      >
      <h3>The card is clickable</h3>
      <button onClick={() => alert('button clicked')}>
        click me
      </button>
      &nbsp;
      <button onClick:stop={() => alert('button clicked')}>
        click me (stop propagation)
      </button>
    </div>
    <h2>Conditional Rendering</h2>
    <button onClick={() => setCond(!cond)}>
      toggle cond
    </button>
    <br/>
    {cond ? 'render' : null}
    <br/>
    <span $if={cond}>
      render by <code>$if</code>
    </span>
    <br/>
    <SpanWithVal
      val={cond}
      $if:val
      >
      render by <code>$if</code> with <code>val</code>
    </SpanWithVal>
    <br/>
    <SpanWithVal
      val={cond}
      $if:val={true}
      >
      render by <code>$if</code> with <code>val</code> and <code>cond=true</code>
    </SpanWithVal>
    <br/>
    <SpanWithVal
      val={cond}
      $if:val={false}
      >
      render by <code>$if</code> with <code>val</code> and <code>cond=false</code>
    </SpanWithVal>
    <br/>
  </>
}
