const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const {verifyToken, checkRole} = require('../middlewares/auth.middleware');
const {loginValidator, registerValidator} = require('../validators/auth.validators');
const {validateFields} = require('../middlewares/validatation.middleware')

router.post('/login',
	...loginValidator,
	validateFields,
	UserController.loginUser)
router.post('/register', verifyToken, checkRole('admin'), ...registerValidator, validateFields, UserController.registerUser)

module.exports = router;