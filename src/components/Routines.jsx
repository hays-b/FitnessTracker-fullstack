import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Routines = () => {
  const { filterRoutines } = useAuth();

  return (
    <>
      <SearchBar />
      <div className="routine-col">
        <h1>Public Routines</h1>
        {Array.isArray(filterRoutines) && filterRoutines.length ? (
          filterRoutines.map((routine, idx) => (
            <div key={"routine" + idx} className="routine-all">
              <Link
                to={`/user=${routine.creatorId}`}
                className="routine-creator"
              >
                Created by: {routine.creatorName}
              </Link>
              <Link to={`/viewroutine=${routine.id}`} className="routine-card">
                <div className="routine-name">{routine.name}</div>
                <div className="routine-goal">Goal: {routine.goal}</div>
                <div>
                  <p>Activities include:</p>
                  <div className="act-list-ctn">
                    {routine.activities?.map((activity, idx) => (
                      <div key={"activity" + idx} className="act-list">
                        {idx === routine.activities.length - 1 ? (
                          <div>{activity.name + " "}</div>
                        ) : (
                          <div>{activity.name + `, `}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>Sorry! We couldn't find what you were looking for.</p>
        )}
      </div>
    </>
  );
};

export default Routines;
