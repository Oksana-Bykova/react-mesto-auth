import React from "react";
import logo from "../images/Vector(2).svg";

function Header() {
  return (
    <header className="header page__section">
      <img className="header__logo" src={logo} alt="Логотип сервиса Место" />
    </header>
  );
}

export default Header;
