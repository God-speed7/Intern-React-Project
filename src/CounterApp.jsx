import { useState } from 'react'
import './CounterApp.css'

function CounterApp() {
  const [count, setCount] = useState(0)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const decreaseCount = () => {
    setCount(count - 1)
  }

  return (
    <section className="counter-card">
      <p className="eyebrow">Task 1</p>
      <h1>Counter App</h1>

      <div className="count-display">{count}</div>

      <div className="button-row">
        {count > 0 && (
          <button
            type="button"
            className="counter-button decrease"
            onClick={decreaseCount}
          >
            -
          </button>
        )}

        <button
          type="button"
          className="counter-button increase"
          onClick={increaseCount}
        >
          +
        </button>
      </div>
    </section>
  )
}

export default CounterApp
