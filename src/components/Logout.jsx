import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser({ id: "", username: "" });
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        handleLogOut();
        navigate("/");
      }}
    >
      <button type="submit">Log Out</button>
    </form>
  );
};

export default Logout;
