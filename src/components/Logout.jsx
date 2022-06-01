import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUsername, changePassword } from "../api";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const { token, setToken, user, setUser } = useAuth();
  const navigate = useNavigate();

  const [usernameState, setUsernameState] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleChangeUsername = async () => {
    const result = await changeUsername(token, usernameState);
    if (result.message) {
      setUsernameError(result.message);
    } else {
      setUsernameError("");
      setUser({ ...user, username: usernameState });
      setUsernameState("");
    }
  };

  const handleChangePassword = async () => {
    const result = await changePassword(token, passwordState);
    if (result.message) {
      setPasswordError(result.message);
      setPasswordSuccess(false);
    } else {
      setPasswordError("");
      setPasswordState("");
      setPasswordSuccess(true);
    }
  };

  const handleLogOut = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser({ id: "", username: "" });
  };

  return (
    <>
      <h1>Welcome, {user.username}</h1>
      {/* Update Username */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleChangeUsername();
        }}
      >
        {usernameError ? (
          <h3>Unable to change username: {usernameError}</h3>
        ) : null}
        <input
          // className='create-description'
          type="text"
          placeholder="Username"
          value={usernameState}
          onChange={(event) => setUsernameState(event.target.value)}
          required
        />
        <button type="submit">Change Username</button>
      </form>
      {/* Update Password */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleChangePassword();
        }}
      >
        {passwordError ? (
          <h3>Unable to change password: {passwordError}</h3>
        ) : null}
        <input
          // className='create-description'
          type="text"
          placeholder="Password"
          value={passwordState}
          onChange={(event) => setPasswordState(event.target.value)}
          required
        />
        <button type="submit">Change Password</button>
        {passwordSuccess ? (
          <h3>Successfully changed password!</h3>
        ) : null}
      </form>
      {/* Logout */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleLogOut();
          navigate("/");
        }}
      >
        <button type="submit">Log Out</button>
      </form>
    </>
  );
};

export default Logout;
