const express = require("express");
const usersRouter = express.Router();
const {
  getUserByUsername,
  createUser,
  updateUsername,
  updatePassword,
  getAllRoutinesByUser,
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

usersRouter.patch("/username", requireUser, async (req, res, next) => {
  const { username } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (!_user) {
      const user = await updateUsername(req.user.id, username);
      res.send(user);
    } else {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/password", requireUser, async (req, res, next) => {
  const { password } = req.body;

  try {
    if (password.length >= 8) {
      const user = await updatePassword(req.user.id, password);
      res.send(user);
    } else {
      res.status(401);
      next({
        name: "PasswordTooShort",
        message: "password not long enough",
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

usersRouter.get("/:username/routines", requireUser, async (req, res, next) => {
  const { username } = req.params;
  const _username = req.user.username;
  try {
    if (username === _username) {
      const routines = await getAllRoutinesByUser(req.params);
      res.send(routines);
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "You must be logged in as the user you are requesting to see",
      });
    }
  } catch ({ name, message }) {
    console.log("error?");
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
