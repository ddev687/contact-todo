import { check, query } from 'express-validator';
import Contacts from '../models/contacts.model'
import { validationError } from './validation_error';

const contactsCreateValidator = () => {
    return [
        check('phoneNumber').notEmpty().withMessage('Phone number is required'),
        check('phoneNumber').isMobilePhone('en-IN').withMessage('Phone number is invalid'),
        check('phoneNumber')
            .custom(async (value: string) => {
                try {
                    let contacts = await Contacts.findOne({ phoneNumber: value })
                    if (contacts) {
                        return Promise.reject()
                    }
                } catch (err) { }
            })
            .withMessage('This phone number is already in use'),
        check('email')
            .notEmpty()
            .isEmail()
            .withMessage('Email is invalid'),
        check('email')
            .trim()
            .normalizeEmail({ "gmail_remove_dots": false })
            .custom(async (value: string) => {
                try {
                    let contacts = await Contacts.findOne({ email: value })
                    if (contacts) {
                        return Promise.reject()
                    }
                } catch (err) { }
            })
            .withMessage('This email is already in use'),
        check('fullName')
            .exists()
            .isLength({ min: 1 })
            .withMessage('Fullname is requried'),
        validationError
    ]
}

const contactsDeleteValidator = () => {
    return [
        query('contactId', 'contactId is required'),
        validationError,
    ]
};

export {
    contactsCreateValidator,
    contactsDeleteValidator,
}
