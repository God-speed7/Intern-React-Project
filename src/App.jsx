import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AllProducts from './pages/AllProducts'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
