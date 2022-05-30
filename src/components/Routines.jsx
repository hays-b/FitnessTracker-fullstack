import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import SearchBar from './SearchBar'

const Routines = () => {
  const { filterRoutines } = useAuth();

  return (
    <>
    <SearchBar />
    <div id="routineList" className="routine-col">
      <h1>Public Routines</h1>
      {Array.isArray(filterRoutines) && filterRoutines.length ? filterRoutines.map((routine, idx) => (
        <div key={"routine" + idx} className="routine-all">
          <Link to={`/user=${routine.creatorId}`} className='routine-creator'>Created by: {routine.creatorName}</Link>
            <Link to={`/viewroutine=${routine.id}`} className="routine-card">
              <div className='routine-name'>{routine.name}</div>
              <div className='routine-goal'>Goal: {routine.goal}</div>
              <div id="activityList" className="activity-row">
              <p>Activities include:</p>
                {routine.activities?.map((activity, idx) => (
                  <div key={"activity" + idx}>
                    {idx === routine.activities.length - 1
                      ? <div className='act-list'>{activity.name + " "}</div>
                      : <div className='act-list'>{activity.name + `, `}</div>}
                  </div>
                  //   <h4>
                  //     Activity {idx + 1}: {activity.name}{" "}
                  //   </h4>
                  //   <p>{activity.description}</p>
                  //   <div className="activity-row">
                  //     <p>Sets: {activity.sets}</p>
                  //     <p>Reps: {activity.reps}</p>
                  //     <p>Duration: {activity.duration}</p>
                  //   </div>
                  // </div>
                ))}
              </div>
            </Link>
        </div>
      )): <p>Sorry! We couldn't find what you were looking for.</p>}
    </div>
    </>
  );
};

export default Routines;
