import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Movielist from './components/Movielist/Movielist'
import Overons from './components/Overpage/Overons';
import Login_signup from './components/Login/Login_signup';




const App = () => {
  return (
    <div className='app'>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movielist />} />
        <Route path="/Overons" element={<Overons />} />
        <Route path="/Login" element={<Login_signup />} />
      </Routes>
    </Router>

    </div>
  )
}

export default App