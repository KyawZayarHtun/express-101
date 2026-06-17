const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require("./src/middlewares/global-error-handling.middleware");
const config = require('./src/config/config');

const {loggerMiddleware} = require('./src/middlewares/logger.middleware')
const blogRouter = require('./src/routes/blog.router');
const userRouter = require('./src/routes/user.router');

const app = express();

const mongoose = require('mongoose');
mongoose.connect(config.mongodb)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(loggerMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/blogs', blogRouter);
app.use('/blogs', (req, res) => {
  res.send('Back in Main App');
});

app.use('/users', userRouter)


app.use(errorHandler)

module.exports = app;

