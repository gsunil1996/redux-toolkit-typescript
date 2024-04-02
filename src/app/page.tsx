"use client"

import { decrement, increment, incrementAsync, incrementByAmount, reset } from "@/redux/features/counter/counterSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

const Home = () => {
  const { value } = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h2>Count is: {value}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>Increament with payload</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <hr />
      <button onClick={() => dispatch(incrementAsync(2))} >Async Increment</button>
    </div>
  )
}

export default Home