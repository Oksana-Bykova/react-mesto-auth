import React from "react";
import logo from "../images/Vector(2).svg";
import * as auth from '../utils/auth.js';
import { Link, useNavigate} from "react-router-dom";

function Login(props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();



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
    console.log(arr);
    auth.authoize(arr.email, arr.password)
    .then((data) => {
      console.log(data.token);
      if (data.token){
        localStorage.setItem('jwt', data.token)
        props.handleloggedIn();
        navigate('/my-profile')
      }})
      .catch((err) => console.log(err));
      
    }
  

  return(
    <div className="form__container">
    <h1 className="form__title">Вход</h1>
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
    <button type="submit" className="form__button">Войти</button>
  
    </form>
    
  </div>
  )
}

export default Login;