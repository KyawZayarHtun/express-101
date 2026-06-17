const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");


async function verifyToken(req, res, next) {
  let authorization = req.headers.authorization;
  if (!authorization) {
    next(createHttpError(401, 'Unauthorized'))
  }

  const token = authorization.substring("Bearer ".length);
  if (!token) {
    next(createHttpError(401, 'Unauthorized'))
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = payload;
    next()
  } catch (err) {
    next(createHttpError(401, 'Unauthorized'))
  }
}

function checkRole(role) {
  return async (req, res, next) => {
    const user = req.user;
    if (!user) {
      next(createHttpError(401, 'Unauthorized'))
    }

    const userRole = req.user.role;
    if (userRole !== role) {
      next(createHttpError(401, 'Unauthorized'))
    }

    next()
  }
}

module.exports = {
  checkRole,
  verifyToken,
}