import React, { useState } from "react";
import { createActivity } from "../api";
import useAuth from "../hooks/useAuth";

const Activities = () => {
  const { token, activities, setActivities } = useAuth();

  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });
  const [customError, setCustomError] = useState("");

  return (
    <>
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
      ) : (
        <h3>Sign up to create your own activities!</h3>
      )}
      <div id="activityList">
        <h1>All Activities</h1>
        {activities.map((activity, idx) => (
          <div key={"activity" + activity.id}>
            <h1>{activity.name}</h1>
            <h4>Description: {activity.description}</h4>
            {/* <h2>Count: {activity.count}</h2>
            <h3>Duration: {activity.duration}</h3> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Activities;
