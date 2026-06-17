const express = require('express');
const router = express.Router();
const {body, checkSchema} = require('express-validator');

const UserController = require('../controllers/user.controller');
const {verifyToken, checkRole} = require('../middlewares/auth.middleware');

let checkSchema1 = checkSchema({
    username: {
        errorMessage: 'Invalid username',
        isEmail: true,
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
    },
});

router.post('/login',
    checkSchema({
        username: {
            errorMessage: 'Invalid username',
            isEmail: true,
        },
        password: {
            isLength: {
                options: { min: 8 },
                errorMessage: 'Password should be at least 8 chars',
            },
        },
    }),
    UserController.loginUser)
router.post('/register',  UserController.registerUser)

module.exports = router;