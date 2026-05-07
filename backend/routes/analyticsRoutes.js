const express = require('express');

const router = express.Router();

const {
    getAnalytics,
} = require('../controllers/analyticsController.js');

const isAuthenticated =
require('../middleware/authMiddleware.js');


router.get(
    '/',
    isAuthenticated,
    getAnalytics
);

module.exports = router;