import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createRoutine,
  getMyRoutines,
  getPublicRoutines,
} from "../api";
import useAuth from "../hooks/useAuth";

const MyRoutines = () => {
  const { token, myRoutines, setMyRoutines, setRoutines, user } =
    useAuth();

  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });
  const [createError, setCreateError] = useState("");

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
                        </div>
                      ))}
                    </div>
                    <Link to={`/editroutine=${routine.id}`}>Edit Routine</Link>
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