const express = require("express");
const routineActivitiesRouter = express.Router();
const {
  getRoutineById,
  updateRoutineActivity,
  getRoutineActivityById,
  destroyRoutineActivity,
} = require("../db");
const { requireUser } = require("./utils");

routineActivitiesRouter.patch(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {

    const { routineActivityId } = req.params;
    const { count, duration } = req.body;

    const updateFields = {
      id: routineActivityId,
      count,
      duration,
    };

    try {
      const [originalRouAct] = await getRoutineActivityById(routineActivityId)
      const originalRoutine = await getRoutineById(originalRouAct.routineId);

      if (req.user.id === originalRoutine.creatorId) {

        const updatedRA = await updateRoutineActivity(updateFields);

        res.send(updatedRA);
      } else {
        res.status(401);
        next({
          name: "UnauthorizedUserError",
          message: "You cannot update a routine that is not yours",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routineActivitiesRouter.delete(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {
    const { routineActivityId } = req.params;

    try {
      const [originalRA] = await getRoutineActivityById(routineActivityId);
      const originalRoutine = await getRoutineById(originalRA.routineId);

      if (req.user.id === originalRoutine.creatorId) {
      const deletedRA = await destroyRoutineActivity(routineActivityId);

      res.send(deletedRA);
      } else {
          res.status(401);
        next({
            name: "UnauthorizedUserError",
            message: "You cannot delete a routine that is not yours",
          });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = routineActivitiesRouter;
