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
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const result = await loginUser(username, password);
          if (result.error) {
            console.log("error", result);
            setCustomError(result.error);
          } else {
            localStorage.setItem("token", result.token);
            setToken(result.token);

            navigate("/myroutines");
          }
        }}
      >
        {customError ? <h3>Unable to create account: {customError}</h3> : null}
        <input
          value={username}
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
        <input
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
