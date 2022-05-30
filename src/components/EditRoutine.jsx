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

const EditRoutine = ({routine}) => {
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
      <div className="routine-card">
        <h1>Routine: {routine.name}</h1>
        <h4>{routine.isPublic ? "Public" : "Private"}</h4>
        <h2>Goal: {routine.goal}</h2>
        <h3>Activities:</h3>
        {/* if the routine has activities, map and display them too */}
        {routine.activities ? (
          <>
           <UpdateRoutine routine={routine} />
            <div id="activityList" className="activity-row">
              {routine.activities.map((activity, idx) => (
                <div key={"activity" + idx} className="activity-card">
                  <h4>
                    Activity {idx + 1}: {activity.name}{" "}
                  </h4>

                  <UpdateActivity routine={routine} activity={activity} />
                  <button
                    onClick={() => handleActivityRemoval(routine, activity)}
                  >
                    Remove Activity
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => handleRoutineDelete(routine)}>
              Delete Routine
            </button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default EditRoutine;