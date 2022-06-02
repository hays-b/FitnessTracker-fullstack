import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");

  return (
    <div className='routine-col'>
      <form
      className='create-activity'
        onSubmit={async (event) => {
          event.preventDefault();

          const result = await loginUser(username, password);
          if (result.name) {
            console.log("error", result);
            setCustomError(result.message);
          } else {
            console.log("error", result);
            localStorage.setItem("token", result.token);
            setToken(result.token);

            navigate("/myroutines");
          }
        }}
      >
        {customError ? <h3>Unable to create account: {customError}</h3> : null}
        <input
        className='create-name'
          value={username}
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
        <input
        className='create-name'
          value={password}
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
          pattern=".{8,}"
          title="8 characters minimum"
        />
        <button className='create-post'
        type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
