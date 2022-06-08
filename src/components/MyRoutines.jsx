import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createRoutine, getMyRoutines, getPublicRoutines } from "../api";
import useAuth from "../hooks/useAuth";

const MyRoutines = () => {
  const { token, myRoutines, setMyRoutines, setRoutines, user } = useAuth();

  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });
  const [createError, setCreateError] = useState("");

  return (
    <>
      <div className="routine-col">
        <form
          className="create-activity"
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await createRoutine(
              token,
              formState.name,
              formState.goal,
              formState.isPublic
            );
            if (result.message) {
              setCreateError(result.message);
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
          <h3 className="create-title">Create a new routine here!</h3>
          {createError ? (
            <h3>Unable to create routine: {createError}</h3>
          ) : null}
          <div className="pub-priv">
            <input
              className="create-name"
              type="text"
              placeholder="Name"
              value={formState.name}
              onChange={(event) =>
                setFormState({ ...formState, name: event.target.value })
              }
              required
            />
            <select
            className='create-name'
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
          </div>
          <input
            className="create-description"
            type="text"
            placeholder="goal"
            value={formState.goal}
            onChange={(event) =>
              setFormState({ ...formState, goal: event.target.value })
            }
            required
          />
          <button className="create-post" type="submit">
            Create Routine
          </button>
        </form>
        <div className="routine-col">
          {/* if there are myRoutines to map through, display them */}
          {myRoutines.length ? (
            <>
              <h1>Your Routines</h1>
              {myRoutines.map((routine, idx) => (
                <div key={"myRoutines" + idx} className="routine-all">
                  <div className="routine-card single-card">
                    <div className="pub-priv">
                      <h2>{routine.name}</h2>
                      <h4>{routine.isPublic ? "Public" : "Private"}</h4>
                    </div>
                    <h3>{routine.goal}</h3>
                    <h4>Activities:</h4>
                    {/* if the routine has activities, map and display them too */}
                    {routine.activities ? (
                      <>
                        <div className="activity-row">
                          {routine.activities.map((activity, idx) => (
                            <div
                              key={"activity" + idx}
                              className="rou-act-card"
                            >
                              <h4>
                                {idx + 1}: {activity.name}{" "}
                              </h4>
                              <p>Description: {activity.description}</p>
                              <div className="inner-row">
                                <p>Sets: {activity.sets}</p>
                                <p>Reps: {activity.reps}</p>
                                <p>Duration: {activity.duration}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Link
                          to={`/editroutine=${routine.id}`}
                          className="edit-routine-link"
                        >
                          Edit Routine
                        </Link>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MyRoutines;
