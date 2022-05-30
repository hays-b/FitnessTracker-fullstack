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
          <div className="routine-card">
            <Link to={`/viewroutine=${routine.id}`}>
            <h2>{routine.name}</h2>
            <h4>Goal: {routine.goal}</h4>
            <h3>Activities:</h3>
            <div id="activityList" className="activity-row">
              {routine.activities.map((activity, idx) => (
                <div key={"activity" + idx} className="activity-card">
                  <h4>
                    Activity {idx + 1}: {activity.name}{" "}
                  </h4>
                  <p>{activity.description}</p>
                  <div className="activity-row">
                    <p>Count: {activity.count}</p>
                    <p>Duration: {activity.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Routines;
