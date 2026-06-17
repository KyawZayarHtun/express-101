const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {loggerMiddleware} = require('./src/middlewares/logger.middleware')

const blogRouter = require('./src/routes/blog.router');
const errorHandler = require("./src/middlewares/global-error-handling.middleware");

const app = express();

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

app.use(errorHandler)

module.exports = app;

