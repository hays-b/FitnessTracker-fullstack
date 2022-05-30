import React from "react";
import { useLocation } from "react-router-dom";
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
} from "./components";

import useAuth from "./hooks/useAuth";

function App() {
  const { routines, myRoutines } = useAuth();
  let location = useLocation();

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
      </Routes>
    </>
  );
}

export default App;
