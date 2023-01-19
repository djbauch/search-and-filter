import * as React from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      Value: {count} <button onClick={increment}>Increment</button>
    </div>
  )
}
