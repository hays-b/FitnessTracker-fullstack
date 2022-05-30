import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom"; 

const Routines = ({routine}) => {
    const navigate = useNavigate();
    let estimatedTime = 0
    routine.activities?.map((activity, idx) => (
    estimatedTime += (activity.duration)
    ))

  return (
    <div id="routineList" className="routine-col">
        <button onClick={()=>{
            navigate('/routines')}
            }>Back</button>
        <div className="routine-all">
          <p>Created by: {routine.creatorName}</p>
          <div className="routine-card">
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
                    <p>Duration: {activity.duration} min</p>
                  </div>
                </div>
              ))}
              <p>Estimated Time: {estimatedTime} min</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Routines;
