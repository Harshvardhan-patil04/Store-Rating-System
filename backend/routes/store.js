const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const auth = require('../middleware/auth');

router.get('/dashboard', auth(['store']), storeController.getDashboard);

module.exports = router;