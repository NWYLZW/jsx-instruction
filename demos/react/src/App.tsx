import type {} from 'jsx-instruction/react'

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
  </div>
}
