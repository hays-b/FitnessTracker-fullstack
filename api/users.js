const express = require("express");
const usersRouter = express.Router();
const {
  getUserByUsername,
  createUser,
  getPublicRoutinesByUser,
  getAllUsers,
} = require("../db");
const { requireUser } = require("./utils");

require("dotenv").config();
const jwt = require("jsonwebtoken");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userAlreadyExists = await getUserByUsername(username);

    // user must not exist and must have a password of 8 char or more
    if (!userAlreadyExists && password.length >= 8) {
      const user = await createUser({
        username,
        password,
      });

      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({ user, message: "thank you for signing up", token });
    } else {
      if (userAlreadyExists) {
        res.status(401);
        next({
          name: "UserExistsError",
          message: "A user by that username already exists",
        });
      }

      if (password.length < 8) {
        res.status(401);
        next({
          name: "PasswordTooShort",
          message: "password not long enough",
        });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // console.log(username, password)

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign({ username, id: user.id }, process.env.JWT_SECRET);
      // create token & return to user
      res.send({ message: "you're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  res.send({
    id: req.user.id,
    username: req.user.username,
  });
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  const username = req.params;
  try {
    const routines = await getPublicRoutinesByUser(username);

    res.send(routines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();

    res.send(allUsers);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
