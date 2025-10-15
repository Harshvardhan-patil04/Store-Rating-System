const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { ratingValidation, validate } = require('../validators/validators');
const { body } = require('express-validator');

router.get('/stores', auth(['user']), userController.getStores);

router.post('/ratings', auth(['user']), [
    body('storeId').isInt().withMessage('Valid store ID is required'),
    ...ratingValidation
], validate, userController.submitRating);

module.exports = router;