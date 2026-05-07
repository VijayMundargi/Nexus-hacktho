const Order = require('../models/orderModel.js');

const catchAsyncError = require('../middleware/catachAsyncError.js');

const ErrorHandler = require('../utils/errorHandler.js');


const createOrder = catchAsyncError(async (req, res, next) => {

    const {
        partName,
        material,
        quantity,
        deadline,
        description,
        priority
    } = req.body;

    const order = await Order.create({
        partName,
        material,
        quantity,
        deadline,
        description,
        priority,
        createdBy: req.user.id,
    });

    res.status(201).json({
        success: true,
        order,
    });

});


const getOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find()
    .populate('createdBy')
    .populate('assignedOperator');

    res.status(200).json({
        success: true,
        orders,
    });

});


const getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(
        req.params.id
    );

    if (!order) {
        return next(
            new ErrorHandler(
                "Order not found",
                404
            )
        );
    }

    res.status(200).json({
        success: true,
        order,
    });

});


const updateOrderStatus = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(
        req.params.id
    );

    if (!order) {
        return next(
            new ErrorHandler(
                "Order not found",
                404
            )
        );
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
        success: true,
        order,
    });

});


const assignOperator = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(
        req.params.id
    );

    if (!order) {
        return next(
            new ErrorHandler(
                "Order not found",
                404
            )
        );
    }

    order.assignedOperator =
    req.body.operatorId;

    await order.save();

    res.status(200).json({
        success: true,
        order,
    });

});


const deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(
        req.params.id
    );

    if (!order) {
        return next(
            new ErrorHandler(
                "Order not found",
                404
            )
        );
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    });

});


module.exports = {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
    assignOperator,
    deleteOrder,
};