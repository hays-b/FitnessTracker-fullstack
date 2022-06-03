// create the express server here
const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./api");
const client = require('./db/client');

// allows this file to read from the .env
require("dotenv").config();

// logging middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// built-in express method that allows body-parsing of incoming json 
app.use(express.json());
app.use((req, res, next) => {
  console.log('BODDY LOGGER START');
  console.log(req.body);
  console.log('BODDY LOGGER END');
  next();
});

// allows api to connect to the db
client.connect()


// allows api test specs to see the server
app.use(cors());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
app.use('/api', apiRouter);

// by default serve up the react app if we don't recognize the route
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
