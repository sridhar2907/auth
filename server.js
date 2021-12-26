require("dotenv").config();
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/device', require('./users/user.router'));


// global error handler
app.use(errorHandler);

// start server
app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on PORT :", process.env.APP_PORT);
  });

