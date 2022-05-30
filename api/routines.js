const express = require("express");
const routinesRouter = express.Router();
const {
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
  getRoutineActivitiesByRoutine,
  addActivityToRoutine,
} = require("../db");
const { requireUser } = require("./utils");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();

    res.send(allRoutines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.post("/", requireUser, async (req, res, next) => {
  const creatorId = req.user.id;
  const { isPublic, name, goal } = req.body;

  const routineData = {
    creatorId,
    isPublic,
    name,
    goal,
  };

  try {
    const routine = await createRoutine(routineData);

    res.send(routine);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const creatorId = req.user.id;
  const { isPublic, name, goal } = req.body;

  const updateFields = {
    id: routineId,
    creatorId,
    isPublic,
    name,
    goal,
  };

  try {
    const originalRoutine = await getRoutineById(routineId);

    if (originalRoutine.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutine(updateFields);

      res.send(updatedRoutine);
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a routine that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.delete("/:routineId", requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const userId = req.user.id;

  try {
    const routine = await getRoutineById(routineId);

    if (routine && routine.creatorId === userId) {
      const destroyedRoutine = await destroyRoutine(routineId);

      res.send(destroyedRoutine);
    } else {
      // if there was a routine, throw UnauthorizedUserError, otherwise throw RoutineNotFoundError
      next(
        routine
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot delete a routine which is not yours",
            }
          : {
              name: "RoutineNotFoundError",
              message: "That routine does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.post("/:routineId/activities", async (req, res, next) => {
  const { activityId, duration, count } = req.body;
  const { routineId } = req.params;
  const fields = {
    routineId,
    activityId,
    duration,
    count,
  };
  // RoutActObject was written to account for the keyword "id" that's needed in the getRoutineActivities function
  const RoutActObject = { id: routineId };

  try {
    const [RoutActExists] = await getRoutineActivitiesByRoutine(RoutActObject);

    // If that routineId doesn't exist or if the activityId doesn't match, send the created routine_activity. Otherwise, throw error
    if (!RoutActExists || RoutActExists.activityId !== fields.activityId) {
      const routineWithActivity = await addActivityToRoutine(fields);
      res.send(routineWithActivity);
    } else {
      res.status(401);
      next({
        name: "RoutineActivityExistsError",
        message: "That RoutineActivity already exists",
      });
    }
  } catch ({ name, message }) {
    console.log({ name, message });
    next({ name, message });
  }
});

module.exports = routinesRouter;
