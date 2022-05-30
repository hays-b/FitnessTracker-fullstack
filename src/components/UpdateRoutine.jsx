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
    count: "",
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
        activityToAdd.count,
        activityToAdd.duration,
        token
      );
      console.log(activityResult);
    }
    if (result.error) {
      console.log("error", result);
      setUpdateError(result.error);
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
        onSubmit={async (event) => {
          event.preventDefault();
          handleUpdateRoutine();
        }}
      >
        {updateError ? <h3>Unable to update: {updateError}</h3> : null}
        <input
          type="text"
          placeholder={routine.name}
          value={updateState.name}
          onChange={(event) =>
            setUpdateState({ ...updateState, name: event.target.value })
          }
        />
        <input
          type="text"
          placeholder={routine.goal}
          value={updateState.goal}
          onChange={(event) =>
            setUpdateState({ ...updateState, goal: event.target.value })
          }
        />
        {/* sets isPublic to either true or false */}
        <select
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
        <div>
          <label htmlFor="select-activity">Select activity to add</label>
          <select
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
          <input
            type="number"
            placeholder="count"
            value={activityToAdd.count}
            onChange={(event) =>
              setActivityToAdd({ ...activityToAdd, count: event.target.value })
            }
          />
          <input
            type="number"
            placeholder="duration"
            value={activityToAdd.duration}
            onChange={(event) =>
              setActivityToAdd({
                ...activityToAdd,
                duration: event.target.value,
              })
            }
          />
        </div>
        <button type="submit">Update Routine</button>
      </form>
    </>
  );
};

export default UpdateRoutine;
