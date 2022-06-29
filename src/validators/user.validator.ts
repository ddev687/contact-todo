import { check, query } from 'express-validator';
import User from '../models/user.model'
import { validationError } from './validation_error';
const jwt = require('jsonwebtoken');


const registerValidator = () => {
    return [
        check('fullName')
            .exists()
            .isLength({ min: 1 })
            .withMessage('Fullname is requried'),
        check('email').notEmpty().withMessage('Email is required'),
        check('email', 'Invalid email address')
            .exists()
            .isEmail()
            .trim()
            .normalizeEmail({ "gmail_remove_dots": false })
            .custom(async (value: string) => {
                try {
                    let user = await User.findOne({ email: value })
                    if (user) {
                        return Promise.reject()
                    }
                } catch (err) { }
            })
            .withMessage('This email is already in use'),
        check('password')
            .exists()
            .isLength({ min: 8, max: 15 })
            .custom(async value => {
                if (!value.match(/[a-z]/g) || !value.match(/[A-Z]/g) || !value.match(/[0-9]/g)) {
                    return Promise.reject()
                }
            })
            .withMessage('Password should be between 8 to 15 characters and must contain at least one uppercase letter one lowercase letter and one number.'),
        validationError
    ]
}

const loginValidator = () => {
    return [
        check('email').notEmpty().withMessage('Email is required'),
        check('email', 'Invalid email address')
            .exists()
            .isEmail()
            .trim()
            .normalizeEmail({ "gmail_remove_dots": false }),
        check('password')
            .exists()
            .isLength({ min: 8, max: 15 })
            .custom(async value => {
                if (!value.match(/[a-z]/g) || !value.match(/[A-Z]/g) || !value.match(/[0-9]/g)) {
                    return Promise.reject()
                }
            })
            .withMessage('Password should be between 8 to 15 characters and must contain at least one uppercase letter one lowercase letter and one number.'),
        validationError
    ]
}

const verificationValidator = () => {
    return [
        query('verifyToken', 'Verify Token is required'),
        validationError,
    ]
}


export {
    registerValidator,
    verificationValidator,
    loginValidator,
}
