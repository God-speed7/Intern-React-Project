import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <h2 className="brand">React Tasks</h2>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/user">User</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
