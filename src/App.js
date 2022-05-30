import React from "react";
import "./style/app.css";
import { Routes, Route } from "react-router-dom";
import {
  Header,
  Login,
  Home,
  Register,
  Logout,
  Routines,
  MyRoutines,
  Activities,
  SingleRoutine,
  UserRoutines,
  EditRoutine
} from "./components";

import useAuth from "./hooks/useAuth";

function App() {
  const { routines, myRoutines, users } = useAuth();
  // console.log(myRoutines)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/myroutines" element={<MyRoutines />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {Array.isArray(routines)
          ? routines?.map((routine, idx) => (
              <Route
                key={'SingleRoutine' + idx}
                path={`/viewroutine=${routine.id}`}
                element={<SingleRoutine routine={routine} />}
              />
            )): null}
            {Array.isArray(users)
          ? users?.map((user, idx) => (
              <Route
                key={'SingleUser' + idx}
                path={`/user=${user.id}`}
                element={<UserRoutines user={user} />}
              />
            )): null}
            {Array.isArray(myRoutines)
          ? myRoutines?.map((routine, idx) => (
              <Route
                key={'EditRoutine' + idx}
                path={`/editroutine=${routine.id}`}
                element={<EditRoutine routine={routine} />}
              />
            )): null}
      </Routes>
    </>
  );
}

export default App;
