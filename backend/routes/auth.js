const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { userValidation, validate } = require('../validators/validators');
const { body } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/signup', userValidation, validate, authController.signup);

router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], validate, authController.login);

router.post('/change-password', auth(), [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
        .isLength({ min: 8, max: 16 })
        .withMessage('Password must be between 8 and 16 characters')
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage('Password must contain at least one uppercase letter and one special character')
], validate, authController.changePassword);

module.exports = router;