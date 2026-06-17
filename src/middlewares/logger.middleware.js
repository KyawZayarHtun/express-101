const loggerMiddleware = (req, res, next) => {
  console.log("Entering middleware for " + req.url);
  next();
}

module.exports = {
  loggerMiddleware
};