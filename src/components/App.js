import React from 'react';
import { Route } from 'react-router-dom'; 
import { Routes } from 'react-router-dom'; 
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from './Header.js';
import './App.css';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
     
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about-me" element={<AboutMe />} />
        
      
      </Routes>
    </div>
    </BrowserRouter> 
  );
}

export default App; 
