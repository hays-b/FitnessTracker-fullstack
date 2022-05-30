import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Routines = ({ user }) => {
  const navigate = useNavigate();
  const { routines } = useAuth();
  console.log(user, routines)
  const userRoutines = routines.filter(
    (routine) => routine.creatorId === user.id
  );
  console.log(userRoutines)

  return (
    <>
      <button
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        {"< "}Back
      </button>
      <div id="routineList" className="routine-col">
        <h1>{user.username}'s Public Routines</h1>
        {userRoutines.map((routine, idx) => (
          <div key={"routine" + idx} className="routine-all">
            <Link to={`/viewroutine=${routine.id}`} className="routine-card">
              <div className="routine-name">{routine.name}</div>
              <div className="routine-goal">Goal: {routine.goal}</div>
              <div id="activityList" className="activity-row">
                <p>Activities include:</p>
                {routine.activities.map((activity, idx) => (
                  <div key={"activity" + idx}>
                    {idx === routine.activities.length - 1 ? (
                      <div className="act-list">{activity.name + " "}</div>
                    ) : (
                      <div className="act-list">{activity.name + `, `}</div>
                    )}
                  </div>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Routines;
