import CounterApp from '../CounterApp'
import InputHandling from '../InputHandling'
import TodoApp from '../TodoApp'

function Home() {
  return (
    <main className="page home-page">
      <div className="page-heading">
        <p className="eyebrow">Home</p>
        <h1>React Practice Tasks</h1>
      </div>

      <div className="tasks-grid">
        <CounterApp />
        <InputHandling />
        <TodoApp />
      </div>
    </main>
  )
}

export default Home
