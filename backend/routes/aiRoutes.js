const express = require('express');

const router = express.Router();

const {
    aiChat
} = require('../controllers/aiController.js');

const isAuthenticated = require('../middleware/authMiddleware.js');


router.post(
    '/chat',
    isAuthenticated,
    aiChat
);

module.exports = router;