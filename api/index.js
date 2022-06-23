// This file is creating an api router, attaching other routers from files in this api directory, and exporting the api router

const express = require("express");
const apiRouter = express.Router();

// allows this file to read from the .env
require("dotenv").config();

// for jwt
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const usersRouter = require("./users");
const routinesRouter = require("./routines");
const activitiesRouter = require("./activities");
const routineActivitiesRouter = require("./routine_activities");
const { getUserById } = require("../db");

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// check for our user
apiRouter.use((req, res, next) => {
  if (req.user) {
  }
  next();
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    name: "health",
    message: "all is well",
  });
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/routines", routinesRouter);
apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/routine_activities", routineActivitiesRouter);

// error handler
apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
