import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { token } = useAuth();
  let location = useLocation();
  const [navToggle, setNavToggle] = useState(false)


  return (
    <header className="header">
      {/* <h3>Welcome to Fitness Tracker, {user.username || 'guest'}!</h3> */}
      <div className={navToggle ? "nav-menu" : "nav-menu hidden"}>
        <Link
          to="/"
          className={location.pathname === "/" ? "active link" : "link"}
          onClick={()=>{setNavToggle(false)}}
        >
          Home
        </Link>
        <Link
          to="/routines"
          className={location.pathname === "/routines" ? "active link" : "link"}
          onClick={()=>{setNavToggle(false)}}
        >
          Routines
        </Link>
        <Link
          to="/activities"
          className={
            location.pathname === "/activities" ? "active link" : "link"
          }
          onClick={()=>{setNavToggle(false)}}
        >
          Activities
        </Link>
        {token ? (
          <>
            <Link
              to="/myroutines"
              className={
                location.pathname === "/myroutines" ? "active link" : "link"
              }
              onClick={()=>{setNavToggle(false)}}
            >
              MyRoutines
            </Link>
            <Link
              to="/logout"
              className={
                location.pathname === "/logout" ? "active link" : "link"
              }
              onClick={()=>{setNavToggle(false)}}
            >
              Account
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={
                location.pathname === "/login" ? "active link" : "link"
              }
              onClick={()=>{setNavToggle(false)}}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={
                location.pathname === "/signup" ? "active link" : "link"
              }
              onClick={()=>{setNavToggle(false)}}
            >
              Signup
            </Link>
          </>
        )}
      </div>
      <div className='hamburger-ctn'>
      <div className="hamburger" onClick={() => {
        if (navToggle) {
          setNavToggle(false)
        } else {
          setNavToggle(true)
        }
        console.log(navToggle)
      }}>
        <div className='hamburger-line' />
        <div className='hamburger-line' />
        <div className='hamburger-line' />
      </div>
      </div>
    </header>
  );
};

export default Header;
