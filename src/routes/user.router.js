const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const {verifyToken, checkRole} = require('../middlewares/auth.middleware');


router.post('/login', UserController.loginUser)
router.post('/register', verifyToken, checkRole('admin'), UserController.registerUser)

module.exports = router;