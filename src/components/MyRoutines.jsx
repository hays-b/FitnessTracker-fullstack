import React, { useState } from "react";
import {
  createRoutine,
  deleteRoutine,
  deleteRoutineActivity,
  getMyRoutines,
  getPublicRoutines,
} from "../api";
import UpdateRoutine from "./UpdateRoutine";
import UpdateActivity from "./UpdateActivity";
import useAuth from "../hooks/useAuth";

const MyRoutines = () => {
  const { token, myRoutines, setMyRoutines, routines, setRoutines, user } =
    useAuth();

  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });
  const [createError, setCreateError] = useState("");

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

    // console.log("before i filter myroutines: ", myRoutines);
    // setMyRoutines(
    //   myRoutines.filter((routine) => routine.id !== selectedRoutine.id)
    // );
    // console.log("after i filter myroutines: ", myRoutines);
    // if (selectedRoutine.isPublic) {
    //   setRoutines(
    //     routines.filter((routine) => routine.id !== selectedRoutine.id)
    //   );
    // }

    // selectedRoutine.activities.filter(
    //   (activity) =>
    //     activity.routineActivityId !== activityToDelete.routineActivityId
    // );

    // setMyRoutines([...myRoutines, selectedRoutine]);
    // if (selectedRoutine.isPublic) {
    //   setRoutines([...routines, selectedRoutine]);
    // }
  };

  return (
    <>
      <h3>Create your own routine here!</h3>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await createRoutine(
            token,
            formState.name,
            formState.goal,
            formState.isPublic
          );
          if (result.error) {
            console.log("error", result);
            setCreateError(result.error);
          } else {
            setCreateError("");
            // setMyRoutines([...myRoutines, result]);

            const newMyRoutines = await getMyRoutines(user.username, token);
            const newRoutines = await getPublicRoutines();
            setMyRoutines(newMyRoutines);
            setRoutines(newRoutines);
            setFormState({ name: "", goal: "", isPublic: false });
          }
        }}
      >
        {createError ? <h3>Unable to create routine: {createError}</h3> : null}
        <input
          type="text"
          placeholder="Name"
          value={formState.name}
          onChange={(event) =>
            setFormState({ ...formState, name: event.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="goal"
          value={formState.goal}
          onChange={(event) =>
            setFormState({ ...formState, goal: event.target.value })
          }
          required
        />
        <select
          name="isPublic"
          id="select-public"
          value={formState.isPublic}
          onChange={(e) =>
            setFormState({ ...formState, isPublic: e.target.value })
          }
        >
          <option value="false">Private</option>
          <option value="true">Public</option>
        </select>
        <button type="submit">Create Routine</button>
      </form>
      <div className="routine-col">
        {/* if there are myRoutines to map through, display them */}
        {myRoutines.length ? (
          <div id="routineList">
            <h1>Your Routines</h1>
            {myRoutines.map((routine, idx) => (
              <div key={"myRoutines" + idx} className="routine-card">
                <h1>Routine: {routine.name}</h1>
                <h4>{routine.isPublic ? "Public" : "Private"}</h4>
                <h2>Goal: {routine.goal}</h2>
                <h3>Activities:</h3>
                {/* if the routine has activities, map and display them too */}
                {routine.activities ? (
                  <>
                    <div id="activityList" className="activity-row">
                      {routine.activities.map((activity, idx) => (
                        <div key={"activity" + idx} className="activity-card">
                          <h4>
                            Activity {idx + 1}: {activity.name}{" "}
                          </h4>
                          <p>Description: {activity.description}</p>
                          <p>Sets: {activity.sets}</p>
                          <p>Reps: {activity.reps}</p>
                          <p>Duration: {activity.duration}</p>
                          <UpdateActivity
                            routine={routine}
                            activity={activity}
                          />
                          <button
                            onClick={() =>
                              handleActivityRemoval(routine, activity)
                            }
                          >
                            Remove Activity
                          </button>
                        </div>
                      ))}
                    </div>
                    <UpdateRoutine routine={routine} />
                    <button onClick={() => handleRoutineDelete(routine)}>
                      Delete Routine
                    </button>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MyRoutines;

// for each routine which is owned by me I should
// be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
// be able to update the duration or count of any activity on the routine
