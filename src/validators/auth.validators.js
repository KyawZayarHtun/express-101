import {checkSchema} from 'express-validator';
import userService from '../services/user.service.js';

export const loginValidator = checkSchema({
	username: {
		trim: true,
		notEmpty: {errorMessage: 'Username or email is required'},
		isLength: {options: {min: 4}, errorMessage: 'Username must be at least 3 characters long'}
	},
	password: {
		notEmpty: {errorMessage: 'Password is required'},
		isLength: {options: {min: 4}, errorMessage: 'Password must be at least 8 characters long'}
	}
})

export const registerValidator = checkSchema({
	username: {
		trim: true,
		// isEmail: {errorMessage: 'Please provide a valid email address'},
		// normalizeEmail: true,
		// Custom async check to talk to your database
		custom: {
			options: async (value) => {
				const userExists = await userService.findByUsername(value);
				if (userExists) {
					throw new Error('Email is already registered');
				}
				return true; // Validation passed
			}
		}
	},
	password: {
		isLength: {options: {min: 8}, errorMessage: 'Password must be at least 8 characters'}
	}
});