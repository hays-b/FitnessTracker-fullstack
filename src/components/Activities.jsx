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
          <form className='create-activity'
            onSubmit={async (event) => {
              event.preventDefault();
              const result = await createActivity(
                token,
                formState.name,
                formState.description
                );
                if (result.message) {
                  console.log("error", result);
                  setCustomError(result.message);
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
            <h4 className='create-title'>Create your own activity here!</h4>
            {customError ? <h3>Unable to post: {customError}</h3> : null}
            <input
            className='create-name'
              type="text"
              placeholder="Name"
              value={formState.name}
              onChange={(event) =>
                setFormState({ ...formState, name: event.target.value })
              }
              required
            />
            <input
            className='create-description'
              type="text"
              placeholder="Description"
              value={formState.description}
              onChange={(event) =>
                setFormState({ ...formState, description: event.target.value })
              }
              required
            />
            <button
            className='create-post'
            type="submit">Post</button>
          </form>
        </>
      ) : null}
        <h1>All Activities</h1>
      <div className="activity-row">
        {Array.isArray(filterActivities) && filterActivities.length ?filterActivities.map((activity, idx) => (
          <div key={"activity" + idx} className="activity-all">
            <div className="activity-card">
              <div className='routine-name'>{activity.name}</div>
              <p>{activity.description}</p>
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
