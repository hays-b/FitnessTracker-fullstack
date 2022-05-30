const baseURL = "/api";

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getMe = async (token) => {
  try {
    const response = await fetch(`${baseURL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getMyRoutines = async (username, token) => {
  try {
    const response = await fetch(`${baseURL}/users/${username}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${baseURL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllActivities = async () => {
  try {
    const response = await fetch(`${baseURL}/activities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const createActivity = async (token, name, description) => {
  try {
    const response = await fetch(`${baseURL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const updateActivity = async (token, activityId, name, description) => {
  try {
    const response = await fetch(`${baseURL}/activities/${activityId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getPublicRoutinesByActivity = async (activityId) => {
  try {
    const response = await fetch(
      `${baseURL}/activities/${activityId}/routines`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getPublicRoutines = async () => {
  try {
    const response = await fetch(`${baseURL}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const createRoutine = async (token, name, goal, isPublic) => {
  try {
    const response = await fetch(`${baseURL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const updateRoutine = async (routineId, token, name, goal, isPublic) => {
  try {
    const response = await fetch(`${baseURL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteRoutine = async (routineId, token) => {
  try {
    const response = await fetch(`${baseURL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const addActivityToRoutine = async (
  routineId,
  activityId,
  sets,
  reps,
  duration,
  token
) => {
  try {
    const response = await fetch(
      `${baseURL}/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityId,
          sets,
          reps,
          duration,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const updateRoutineActivity = async (
  rouActId,
  token,
  sets,
  reps,
  duration
) => {
  try {
    const response = await fetch(`${baseURL}/routine_activities/${rouActId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sets,
        reps,
        duration,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteRoutineActivity = async (rouActId, token) => {
  try {
    const response = await fetch(`${baseURL}/routine_activities/${rouActId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
