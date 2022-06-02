import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");

  // const history = useHistory();

  return (
    <div className='routine-col'>
      <form
      className='create-activity'
        onSubmit={async (e) => {
          e.preventDefault();

          const result = await registerUser(username, password);
          console.log(result.token);
          if (result.name) {
            console.log("error", result);
            setCustomError(result.message);
          } else {
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
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
        className='create-name'
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          pattern=".{8,}"
          title="8 characters minimum"
        />
        <button className='create-post'
        type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
