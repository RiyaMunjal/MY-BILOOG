import { Outlet } from 'react-router-dom'
import './App.scss'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className='app'>
      <div className="conatiner">
        <Navbar></Navbar>
        <Outlet></Outlet>
       
      </div>
    </div>
  )
}

export default App
