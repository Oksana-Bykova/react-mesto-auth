import React from 'react';
import { NavLink } from 'react-router-dom';
//import './NavBar.css';

function NavBar () {
  return (
    <nav className="menu">
      <NavLink to="/" className="menu__link">Домой</NavLink>
      <NavLink to="/reviews" className="menu__link">Обзоры эмодзи</NavLink>
      <NavLink to="/about-me" className="menu__link">Обо мне</NavLink>
    </nav>
  )
}

export default NavBar; 