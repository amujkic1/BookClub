import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Login from './components/Login/Login'

function App() {
  return(
    <div>
      <Login/>
      {/*<Navbar/>
      <Home/>*/}
    </div>
  ) 
}

export default App
