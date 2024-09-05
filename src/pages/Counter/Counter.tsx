import { useCounterStore } from "../../store"


const Counter = () => {

  const {count, increment, incrementAsync, decrement, decrementAsync} = useCounterStore((state) => state);
  return (
    <div className="text-center text-pretty font-medium">
      <h1 className="text-3xl">Simple Counter App</h1>
      <span className="text-3xl inline-block pt-5">{count}</span>
      <div className="flex items-center justify-center gap-4 py-5">
        <button className="p-5 rounded-full" onClick={decrement}>decrement</button>
        <button className="p-5 rounded-full" onClick={decrementAsync}>decrementAsync</button>
        <button className="p-5 rounded-full" onClick={increment}>increment</button>
        <button className="p-5 rounded-full" onClick={incrementAsync}>incrementAsync</button>
      </div>
    </div>
  );
}

export default Counter