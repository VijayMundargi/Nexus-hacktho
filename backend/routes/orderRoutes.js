const express = require('express');

const router = express.Router();

const {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
    assignOperator,
    deleteOrder,
} = require('../controllers/orderController.js');

const isAuthenticated = require('../middleware/authMiddleware.js');


router.post(
    '/create',
    isAuthenticated,
    createOrder
);

router.get(
    '/',
    isAuthenticated,
    getOrders
);

router.get(
    '/:id',
    isAuthenticated,
    getSingleOrder
);

router.put(
    '/:id/status',
    isAuthenticated,
    updateOrderStatus
);

router.put(
    '/:id/assign',
    isAuthenticated,
    assignOperator
);

router.delete(
    '/:id',
    isAuthenticated,
    deleteOrder
);

module.exports = router;