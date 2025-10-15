const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const { userValidation, validate } = require('../validators/validators');
const { body } = require('express-validator');

router.get('/dashboard', auth(['admin']), adminController.getDashboardStats);

router.post('/users', auth(['admin']), [
    ...userValidation,
    body('role').isIn(['user', 'store', 'admin']).withMessage('Invalid role')
], validate, adminController.addUser);

// Add this new route for adding stores
router.post('/stores', auth(['admin']), [
    ...userValidation
], validate, adminController.addStore);

router.get('/stores', auth(['admin']), adminController.getStores);

router.get('/users', auth(['admin']), adminController.getUsers);

router.get('/users/:id', auth(['admin']), adminController.getUserDetails);

module.exports = router;