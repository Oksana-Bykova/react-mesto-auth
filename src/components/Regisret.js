import React from "react";
import { Link, useNavigate} from "react-router-dom";
import * as auth from '../utils/auth.js';
import Header from "./Header.js";

function Register(props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const navigate = useNavigate();




  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const arr ={
      email: email,
      password: password,
    };
    props.onRegister(email, password);
    
  }

  return (
    <>
      <Header   loggedIn={false} headerMenu="Войти" />
      <div className="form__container">
        <h1 className="form__title">Регистрация</h1>
        <form 
        className="form__form"
        onSubmit={handleSubmit}> 
        <input 
          type="text"
          className="form__input"
          name="email"
          id="email"
          placeholder="Email"
          minLength={2}
          maxLength={30}
          required=""
          onChange={handleEmail}
        />
        <input
          type="text"
          className="form__input"
          name="password"
          id="password"
          placeholder="Пароль"
          minLength={2}
          maxLength={30}
          required=""
          onChange={handlePassword}
        />
        <button type="submit" className="form__button">Зарегистрироваться</button>
      
        </form>
        <span className="form__span">Уже зарегистрированы?
        <Link to = "/sign-in" className="form__span"> Войти</Link></span>
        
      </div>
    </>
  )
}

export {Register};