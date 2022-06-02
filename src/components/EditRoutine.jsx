import React from "react";
import {
  deleteRoutine,
  deleteRoutineActivity,
  getMyRoutines,
  getPublicRoutines,
} from "../api";
import UpdateRoutine from "./UpdateRoutine";
import UpdateActivity from "./UpdateActivity";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const EditRoutine = ({ routine }) => {
  const navigate = useNavigate();
  const { token, myRoutines, setMyRoutines, routines, setRoutines, user } =
    useAuth();

  // After deleting the routine, this function filters it out of the useStates
  const handleRoutineDelete = async (routineToDelete) => {
    await deleteRoutine(routineToDelete.id, token);

    setMyRoutines(
      myRoutines.filter((routine) => routine.id !== routineToDelete.id)
    );
    if (routineToDelete.isPublic) {
      setRoutines(
        routines.filter((routine) => routine.id !== routineToDelete.id)
      );
    }
  };

  // After removing the activity from the routine, this function filters the selected routine out of the useStates, mutates the activities list, and inserts it back in.
  const handleActivityRemoval = async (selectedRoutine, activityToDelete) => {
    await deleteRoutineActivity(activityToDelete.routineActivityId, token);

    const newMyRoutines = await getMyRoutines(user.username, token);
    const newRoutines = await getPublicRoutines();
    setMyRoutines(newMyRoutines);
    setRoutines(newRoutines);
  };

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
      <div className="routine-col">
        <div className="routine-all">
          <div className="routine-card single-card">
            <UpdateRoutine routine={routine} />
            {routine.activities ? (
              <>
                {/* if the routine has activities, map and display them too */}
                <h3>Activities:</h3>
                <div className="activity-row">
                  {routine.activities.map((activity, idx) => (
                    <div key={"activity" + idx} className="edit-activity-card">
                      <h4>
                        {idx + 1}: {activity.name}{" "}
                      </h4>
                      <div className="update-routine">

                      <UpdateActivity routine={routine} activity={activity} />
                      
                      {/* <div className='update-routine'> */}
                          <button
                      className='remove-post'
                        onClick={() => handleActivityRemoval(routine, activity)}
                      >
                        Remove Activity
                      </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className='remove-post centered'onClick={() => handleRoutineDelete(routine)}>
                  Delete Routine
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRoutine;
