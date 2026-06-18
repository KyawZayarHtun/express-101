const userService = require('../services/user.service');

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