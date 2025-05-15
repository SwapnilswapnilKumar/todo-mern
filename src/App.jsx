import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from './Pages/Home.jsx';
import YourTask from './Pages/yourtask.jsx';
import LoginSignup from './Pages/loginSignup.jsx';
import './App.css'

const App = ()=>{
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='yourtask' element={<YourTask />} />
        <Route path='/login' element={<LoginSignup />} />
        
      </Routes>

      </BrowserRouter>

    
  )
}
export default App
