const express = require('express');

const router = express.Router();

const QualityLog =
require('../models/QualityLog.js');

const isAuthenticated =
require('../middleware/authMiddleware.js');


router.get(
    '/',
    isAuthenticated,
    async (req, res) => {

        const logs =
        await QualityLog.find()
        .populate('orderId')
        .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            logs,
        });
    }
);

module.exports = router;