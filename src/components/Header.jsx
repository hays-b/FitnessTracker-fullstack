import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const { token, user } = useAuth();
  let location = useLocation();


  return (
    <header className="header">
        {/* <h3>Welcome to Fitness Tracker, {user.username || 'guest'}!</h3> */}
        <Link
          to="/"
          className={location.pathname === "/" ? "active link" : "link"}
        >
          Home
        </Link>
        <Link
          to="/routines"
          className={location.pathname === "/routines" ? "active link" : "link"}
        >
          Routines
        </Link>
        <Link
          to="/activities"
          className={
            location.pathname === "/activities" ? "active link" : "link"
          }
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
            >
              MyRoutines
            </Link>
            <Link
              to="/logout"
              className={
                location.pathname === "/logout" ? "active link" : "link"
              }
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={
                location.pathname === "/login" ? "active link" : "link"
              }
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={
                location.pathname === "/signup" ? "active link" : "link"
              }
            >
              Signup
            </Link>
          </>
        )}
      </header>
  );
};

export default Header;
