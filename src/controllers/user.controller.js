const userService = require('../services/user.service');
const {validationResult, checkSchema} = require('express-validator');

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const token = await userService.registerUser(user);
    res.status(200).send({
      message: `${user.username} has been registered`,
      token,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    })
  }
}

const loginUser = async (req, res) => {
  /*let isValidRequest = validationResult(req);
  if (!isValidRequest.isEmpty()) {
    res.status(400).send({
      message: `${req.body.username} is not a valid email`,
      errors: isValidRequest.array()
    })
  }*/
  const result = await checkSchema({
    username: { isEmpty: true, errorMessage: 'Username is required' },
    password: { isLength: { options: { min: 8 } }, errorMessage: 'Password is required' },
  }).run(req);

  if (result.length > 0) {
    return res.status(400).json({
      message: `${req.body.username} is not a valid email`,
      errors: result
    }).end()
  }


  try {
    const user = req.body;
    const token = await userService.loginUser(user);
    return res.status(200).send({
      message: `${user.username} has been logged in`,
      token,
    })
  } catch (error) {
    return res.status(401).send({
      message: error.message,
    })
  }
}


module.exports = {
  loginUser,
  registerUser
}