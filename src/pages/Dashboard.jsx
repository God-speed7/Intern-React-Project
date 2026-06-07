import { Link } from 'react-router-dom'

const dashboardItems = [
  {
    title: 'Counter App',
    description: 'Practice simple state updates with increase and decrease actions.',
    path: '/counter',
  },
  {
    title: 'Input Handling',
    description: 'Work with controlled inputs, live preview, and text statistics.',
    path: '/input',
  },
  {
    title: 'Todo App',
    description: 'Create, edit, complete, and remove todos from a saved list.',
    path: '/todo',
  },
]

function Dashboard() {
  return (
    <main className="page">
      <div className="page-heading">
        <p className="eyebrow">Dashboard</p>
        <h1>Task Dashboard</h1>
      </div>

      <section className="dashboard-nav-grid" aria-label="Task pages">
        {dashboardItems.map((item) => (
          <Link className="dashboard-nav-card" to={item.path} key={item.path}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span>Open</span>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default Dashboard
