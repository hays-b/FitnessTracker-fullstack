import React from "react";
import { Link } from "react-router-dom"
import runner from '../assets/running-heart.png'
import bicep from '../assets/bicep-heart.png'
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="routine-col">
      <h1>Welcome to Fitness Tracker{user.username ? `, ${user.username}`: null }!</h1>
      <p className='center'>Your one stop shop for fitness inspiration and community collaboration!</p>
      <div className='home-row'>
        <img className="home-img" src={runner} alt="Runner" />
      <Link to='/routines' className='home-card'>
        <p>Browse workout routines and find one that works for you! Or sign in to create your own to share with others!</p>
        <h3 className='arrow'>{'>'}</h3>
      </Link>
      </div>
      <div className='home-row'>
      <Link to='/activities' className='home-card'>
        <h3 className='arrow'>{'<'}</h3>
        <p>Browse individual activities to gain inspiration or to add to your own routines!</p>
      </Link>
        <img className="home-img" src={bicep} alt="Bicep" />
        </div>
    </div>
  );
};

export default Home;
