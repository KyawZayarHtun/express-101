import { validationResult } from 'express-validator';

export const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return early if there are errors, formatting them cleanly
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: errors.array({ onlyFirstError: true }) // Keeps the response clean
        });
    }

    // No errors? Move to the next middleware or controller!
    next();
};