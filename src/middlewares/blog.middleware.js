const AppError = require("../errors/AppError");
const blogRouterMiddleware = (req, res, next) => {
  console.log("blog router middleware error 1");
  next('router');
  // if (Number(req.params.id) === 0) {
  //   console.log("blog router middleware error 1");
  //   next('router');
  // } else {
  //   console.log("blog router middleware 1");
  //   next()
  // }
}

const blogRouterMiddleware2 = (req, res, next) => {
  console.log("blog router middleware 2");
  next()
}

const blogControllerMiddleware = (req, res, next) => {
  // if (Number(req.params.id) === 0) {
  //   console.log("blog controller middleware error 1");
  //   next(new AppError("No blog controller middleware error"));
  // } else {
  //   console.log("blog controller middleware 1");
  //   next()
  // }

  console.log("blog controller middleware 1");
  next()
}

const blogControllerMiddleware2 = (req, res, next) => {
  console.log("blog controller middleware 2");
  next()
}

module.exports = {
  blogControllerMiddleware,
  blogControllerMiddleware2,
  blogRouterMiddleware,
  blogRouterMiddleware2,
}