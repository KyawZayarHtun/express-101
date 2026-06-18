import { checkSchema } from 'express-validator';

export const loginValidator = checkSchema({
    username: {
        trim: true,
        notEmpty: { errorMessage: 'Username or email is required' },
        isLength: { options: { min: 4 }, errorMessage: 'Username must be at least 3 characters long' }
    },
    password: {
        notEmpty: { errorMessage: 'Password is required' },
        isLength: { options: { min: 4 }, errorMessage: 'Password must be at least 8 characters long' }
    }
})