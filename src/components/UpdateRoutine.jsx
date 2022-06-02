import React, { useState } from "react";
import {
  updateRoutine,
  addActivityToRoutine,
  getPublicRoutines,
  getMyRoutines,
} from "../api";
import useAuth from "../hooks/useAuth";

const UpdateRoutine = ({ routine }) => {
  const { token, user, setMyRoutines, activities, setRoutines } = useAuth();

  const [updateState, setUpdateState] = useState({
    name: routine.name,
    goal: routine.goal,
    isPublic: routine.isPublic,
  });
  const [activityToAdd, setActivityToAdd] = useState({
    id: "",
    name: "Any",
    sets: "",
    reps: "",
    duration: "",
  });
  const [updateError, setUpdateError] = useState("");

  const handleUpdateRoutine = async () => {
    const result = await updateRoutine(
      routine.id,
      token,
      updateState.name,
      updateState.goal,
      updateState.isPublic
    );
    if (activityToAdd.id) {
      const activityResult = await addActivityToRoutine(
        routine.id,
        activityToAdd.id,
        activityToAdd.sets,
        activityToAdd.reps,
        activityToAdd.duration,
        token
      );
      console.log(activityResult);
    }
    if (result.message) {
      console.log("error", result);
      setUpdateError(result.message);
    } else {
      setUpdateError("");

      const newMyRoutines = await getMyRoutines(user.username, token);
      const newRoutines = await getPublicRoutines();
      setMyRoutines(newMyRoutines);
      setRoutines(newRoutines);
    }
  };

  return (
    <>
      <form
        className="update-routine"
        onSubmit={async (event) => {
          event.preventDefault();
          handleUpdateRoutine();
        }}
      >
        {updateError ? <h3>Unable to update: {updateError}</h3> : null}
        <div className="pub-priv">
          <input
            className="create-name"
            type="text"
            placeholder={routine.name}
            value={updateState.name}
            onChange={(event) =>
              setUpdateState({ ...updateState, name: event.target.value })
            }
          />
          {/* sets isPublic to either true or false */}
          <select
            className="create-name"
            name="isPublic"
            id="select-public"
            value={updateState.isPublic}
            onChange={(e) =>
              setUpdateState({ ...updateState, isPublic: e.target.value })
            }
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>
        <input
          className="create-description"
          type="text"
          placeholder={routine.goal}
          value={updateState.goal}
          onChange={(event) =>
            setUpdateState({ ...updateState, goal: event.target.value })
          }
        />
        <div className='create-description'>
          <label htmlFor="select-activity">Select activity to add: </label>
          <select
          className="create-name"
            name="activity"
            id="select-activity"
            value={activityToAdd.id}
            onChange={(e) =>
              setActivityToAdd({ ...activityToAdd, id: e.target.value })
            }
            /* this should update the value of the activities */
          >
            <option value="any">Any</option>
            {activities.map((activity, index) => {
              return (
                <option key={`activitiesList: ${index}`} value={activity.id}>
                  {activity.name}
                </option>
              );
            })}
            {/* map over the activities, return an <option /> */}
          </select>
          <div className="inner-row">
            <div>
              <label htmlFor="sets">Sets: </label>
              <input
                className="inner-input"
                name="sets"
                type="number"
                placeholder="Sets"
                value={activityToAdd.sets}
                onChange={(event) =>
                  setActivityToAdd({
                    ...activityToAdd,
                    sets: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="reps">Reps: </label>
              <input
                className="inner-input"
                name="reps"
                type="number"
                placeholder="Reps"
                value={activityToAdd.reps}
                onChange={(event) =>
                  setActivityToAdd({
                    ...activityToAdd,
                    reps: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="duration">Duration: </label>
              <input
                className="inner-input"
                name="duration"
                type="number"
                placeholder="Duration"
                value={activityToAdd.duration}
                onChange={(event) =>
                  setActivityToAdd({
                    ...activityToAdd,
                    duration: event.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <button className="create-post" type="submit">
          Save Changes
        </button>
      </form>
    </>
  );
};

export default UpdateRoutine;
