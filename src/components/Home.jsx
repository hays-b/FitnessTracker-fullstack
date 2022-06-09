import React from "react";
import happiness from "../assets/happiness.png";

const Home = () => {
  return (
    <div className="routine-col">
      <h1>Welcome to Fitness Tracker!</h1>
        <img className="img" src={happiness} alt="Happiness" />
    </div>
  );
};

export default Home;
