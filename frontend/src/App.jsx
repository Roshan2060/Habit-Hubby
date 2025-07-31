import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar.jsx';
import Login from './component/Login.jsx';
import Home from './component/Home.jsx';
import Signup from './component/Signup.jsx';
import Dashboard from './component/Dashboard.jsx';
import FeaturesSection from './component/Features.jsx';
import AboutSection from './component/About.jsx';
import Footer from './component/Footer.jsx';




function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20"> {/* padding for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element ={<Signup/>}/>
          <Route path='/dashboard' element ={<Dashboard/>}/>
          <Route path='/features' element ={<FeaturesSection/>}/>
           <Route path='/about' element ={<AboutSection/>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
