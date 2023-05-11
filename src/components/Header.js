import React from 'react';
import headerLogo from '../logo.svg';
//import './Header.css';

function Header() {
  return (
    <div className="header">
      <img alt="" className="header__logo" src={headerLogo} />
      <h1 className="header__header"></h1>
    </div>
  );
}

export default Header;