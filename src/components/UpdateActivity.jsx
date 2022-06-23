import React, { useState } from "react";
import {
  getAllActivities,
  updateActivity,
  getMyRoutines,
  getPublicRoutines,
  updateRoutineActivity,
} from "../api";
import useAuth from "../hooks/useAuth";

const UpdateActivity = ({ activity }) => {
  const { user, token, setActivities, setMyRoutines, setRoutines } = useAuth();

  const [updateState, setUpdateState] = useState({
    name: activity.name,
    description: activity.description,
    sets: activity.sets,
    reps: activity.reps,
    duration: activity.duration,
  });

  const handleUpdateActivity = async () => {
    const Actresult = await updateActivity(
      token,
      activity.id,
      updateState.name,
      updateState.description
    );
    const RouActResult = await updateRoutineActivity(
      activity.routineActivityId,
      token,
      updateState.sets,
      updateState.reps,
      updateState.duration
    );

    const newActivities = await getAllActivities();
    const newMyRoutines = await getMyRoutines(user.username, token);
    const newRoutines = await getPublicRoutines();
    setActivities(newActivities);
    setRoutines(newRoutines);
    setMyRoutines(newMyRoutines);
  };
  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          handleUpdateActivity();
        }}
      >
        <div className="pub-priv">
          <input
            className="create-name"
            type="text"
            placeholder={activity.name}
            value={updateState.name}
            onChange={(event) =>
              setUpdateState({ ...updateState, name: event.target.value })
            }
          />
        </div>
        <input
          className="create-description activity-description"
          type="text"
          placeholder={activity.description}
          value={updateState.description}
          onChange={(event) =>
            setUpdateState({ ...updateState, description: event.target.value })
          }
        />
        <div className="inner-row">
          <div>
            <label htmlFor="sets">Sets: </label>
            <input
              className="inner-input"
              name="sets"
              type="text"
              placeholder={activity.sets}
              value={updateState.sets}
              onChange={(event) =>
                setUpdateState({ ...updateState, sets: event.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="reps">Reps: </label>
            <input
              className="inner-input"
              name="reps"
              type="text"
              placeholder={activity.reps}
              value={updateState.reps}
              onChange={(event) =>
                setUpdateState({ ...updateState, reps: event.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="duration">Duration: </label>
            <input
              className="inner-input"
              name="duration"
              type="text"
              placeholder={activity.duration}
              value={updateState.duration}
              onChange={(event) =>
                setUpdateState({ ...updateState, duration: event.target.value })
              }
            />
          </div>
        </div>
        <button className="update-post" type="submit">
          Update Activity
        </button>
      </form>
    </>
  );
};

export default UpdateActivity;
