const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
const config = require("../config/config");

const registerUser = async user => {

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(user.password, salt);

  let newUser = new User({
    username: user.username,
    password: hash,
    role: user.role,
  })

  const registeredUser = await newUser.save();

  let payload = {
    username: registeredUser.username,
    role: registeredUser.role,
  }

  const sign = jwt.sign(payload, config.jwtSecret);
  return {sign};

}

const loginUser = async user => {
  let registerUser = await User.findOne({
    username: user.username,
  })

  if (!registerUser) {
    throw new AppError("User not found!");
  }

  const isValidPassword = await bcrypt.compare(user.password, registerUser.password)
  if (!isValidPassword) {
    throw new AppError("Invalid user!");
  }

  let payload = {
    username: registerUser.username,
    role: registerUser.role,
  }

  let token = await jwt.sign(payload, config.jwtSecret);

  return {token};

}

const findByUsername = async (username) => {
	return await User.findOne({
		username
	})
}

module.exports = {
  registerUser,
  loginUser,
	findByUsername
}