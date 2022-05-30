import React, { useState } from "react";
import { createActivity } from "../api";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";

const Activities = () => {
  const { token, filterActivities, activities, setActivities } = useAuth();

  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });
  const [customError, setCustomError] = useState("");

  return (
    <>
    <SearchBar />
    <div className='activities-col'>
      {token ? (
        <>
          <h3>Create your own activity here!</h3>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const result = await createActivity(
                token,
                formState.name,
                formState.description
              );
              if (result.error) {
                // console.log("error", result);
                setCustomError(result.error);
              } else {
                setCustomError("");
                setActivities([...activities, result]);
                setFormState({
                  name: "",
                  description: "",
                });
              }
            }}
          >
            {customError ? <h3>Unable to post: {customError}</h3> : null}
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
              placeholder="Description"
              value={formState.description}
              onChange={(event) =>
                setFormState({ ...formState, description: event.target.value })
              }
              required
            />
            <button type="submit">Post</button>
          </form>
        </>
      ) : null}
        <h1>All Activities</h1>
      <div id="activityList" className="activity-row">
        {Array.isArray(filterActivities) && filterActivities.length ?filterActivities.map((activity, idx) => (
          <div key={"activity" + idx} className="activity-all">
            <div className="activity-card">
              <div className='routine-name'>{activity.name}</div>
              <div className='routine-goal'>{activity.description}</div>
              {/* <h2>Count: {activity.count}</h2>
            <h3>Duration: {activity.duration}</h3> */}
            </div>
          </div>
        )): <p>Sorry! We couldn't find what you were looking for.</p>}
      </div>
      </div>
    </>
  );
};

export default Activities;
