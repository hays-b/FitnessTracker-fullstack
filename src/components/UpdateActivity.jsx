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
    count: activity.count,
    duration: activity.duration,
  });

  const handleUpdateActivity = async () => {
    const result = await updateActivity(
      token,
      activity.id,
      updateState.name,
      updateState.description
    );
    const otherResult = await updateRoutineActivity(
      activity.routineActivityId,
      token,
      updateState.count,
      updateState.duration
    );

    console.log(result + otherResult);

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
        <input
          type="text"
          placeholder={activity.name}
          value={updateState.name}
          onChange={(event) =>
            setUpdateState({ ...updateState, name: event.target.value })
          }
        />
        <input
          type="text"
          placeholder={activity.description}
          value={updateState.description}
          onChange={(event) =>
            setUpdateState({ ...updateState, description: event.target.value })
          }
        />
        <input
          type="text"
          placeholder={activity.count}
          value={updateState.count}
          onChange={(event) =>
            setUpdateState({ ...updateState, count: event.target.value })
          }
        />
        <input
          type="text"
          placeholder={activity.duration}
          value={updateState.duration}
          onChange={(event) =>
            setUpdateState({ ...updateState, duration: event.target.value })
          }
        />
        <button type="submit">Update Activity</button>
      </form>
    </>
  );
};

export default UpdateActivity;
