import React from 'react';
//import './Dashboard.css';
import { Link } from 'react-router-dom'; 

function Dashboard () {
  return (
    <div className="dashboard">
      <h2>Emoji Critic — всё об эмодзи</h2>
      <p>
        #1 среди авторов обзоров на эмодзи в этом году!
      </p>
      <Link to="/reviews">
        Нажмите, чтобы увидеть самые свежие ревью!
      </Link>
    </div>
  )
}

export default Dashboard; 