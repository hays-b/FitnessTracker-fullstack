import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Routines = () => {
  const { routines } = useAuth();

  return (
    <div id="routineList" className="routine-col">
      <h1>Public Routines</h1>
      {routines.map((routine, idx) => (
        <div key={"routine" + idx} className="routine-all">
          <p>Created by: {routine.creatorName}</p>
            <Link to={`/viewroutine=${routine.id}`} className="routine-card">
              <div className='routine-name'>{routine.name}</div>
              <div className='routine-goal'>Goal: {routine.goal}</div>
              <div id="activityList" className="activity-row">
              <p>Activities include:</p>
                {routine.activities.map((activity, idx) => (
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
      ))}
    </div>
  );
};

export default Routines;
