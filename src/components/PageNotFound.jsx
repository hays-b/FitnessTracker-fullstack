import React from "react";
import { Link } from "react-router-dom";
import happiness from "../assets/happiness.png";

const Home = () => {
  return (
    <div className="routine-col">
      <h1>Sorry, we can't find what you're looking for!</h1>
        <img className="img" src={happiness} alt="Happiness" />
        <Link className='create-post' to=''>Return to Safety!</Link>
    </div>
  );
};

export default Home;
