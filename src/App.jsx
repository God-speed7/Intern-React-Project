import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CounterPage from './pages/CounterPage'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import InputHandlingPage from './pages/InputHandlingPage'
import Products from './pages/Products'
import TodoPage from './pages/TodoPage'
import User from './pages/User'
import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/input" element={<InputHandlingPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  )
}

export default App
