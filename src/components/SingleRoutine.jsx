import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Routines = ({ routine }) => {
  const navigate = useNavigate();
  let estimatedTime = 0;
  routine.activities?.map(
    (activity, idx) => (estimatedTime += activity.duration)
  );

  return (
    <>
      <button
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        {'< '}Back
      </button>
      <div className="routine-col">
        <div className="routine-all">
        <Link to={`/user=${routine.creatorId}`} className='routine-creator'>Created by: {routine.creatorName}</Link>
          <div className="routine-card single-card">
            <h2>{routine.name}</h2>
            <h4>{routine.goal}</h4>
            <h3>Activities:</h3>
            <div className="activity-row">
              {routine.activities.map((activity, idx) => (
                <div key={"activity" + idx} className="rou-act-card">
                  <h4>
                    {idx + 1}: {activity.name}{" "}
                  </h4>
                  <p>{activity.description}</p>
                  <div className="inner-row">
                    <p>Sets: {activity.sets}</p>
                    <p>Reps: {activity.reps}</p>
                    <p>Duration: {activity.duration} min</p>
                  </div>
                </div>
              ))}
            </div>
              <h4 className='est-time'>Estimated Time: {estimatedTime} min</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Routines;
