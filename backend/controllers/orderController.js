const Order = require('../models/orderModel.js');

const catchAsyncError =
require('../middleware/catachAsyncError.js');

const ErrorHandler =
require('../utils/errorHandler.js');



// CREATE ORDER

const createOrder =
catchAsyncError(
async (req, res, next) => {

    const {

        partName,

        material,

        quantity,

        deadline,

        description,

        priority,

        specifications,

        aiNotes,

    } = req.body;



    // Generate Product Code
    // Example:
    // TIT-FLG-80MM

    const materialCode =
    material
    ?.substring(0, 3)
    ?.toUpperCase() || 'MAT';


    const productType =
    partName
    ?.split(' ')[1]
    ?.substring(0, 3)
    ?.toUpperCase() || 'PRD';


    const boreCode =
    specifications?.boreSize
    ?.replace(/\s/g, '')
    ?.toUpperCase() || 'STD';


    const productCode =
    `${materialCode}-${productType}-${boreCode}`;


    const order =
    await Order.create({

        partName,

        material,

        quantity,

        deadline,

        description,

        priority,

        productCode,

        aiNotes,

        specifications,

        createdBy:
        req.user.id,

        workflow: {

            currentStage:
            'Order Received',

            progress: 10,

            estimatedCompletion:
            deadline,
        },

        aiMetadata: {

            extractedByAI: true,

            aiConfidence: 95,

            sourcePrompt:
            req.body.sourcePrompt || '',
        },
    });



    res.status(201).json({

        success: true,

        action:
        'create_order',

        severity:
        'success',

        title:
        'Manufacturing Order Created',

        description:
        `Order ${order.orderNumber} successfully created.`,

        data: order,
    });
});




// GET ALL ORDERS

const getOrders =
catchAsyncError(
async (req, res, next) => {

    const orders =
    await Order.find({

        isArchived: false,
    })

    .populate(
        'createdBy',
        'name email role'
    )

    .populate(
        'assignedOperator',
        'name email'
    )

    .sort({
        createdAt: -1,
    });



    res.status(200).json({

        success: true,

        totalOrders:
        orders.length,

        orders,
    });
});




// GET SINGLE ORDER

const getSingleOrder =
catchAsyncError(
async (req, res, next) => {

    const order =
    await Order.findOne({

        $or: [

            {
                _id:
                req.params.id,
            },

            {
                orderNumber:
                req.params.id,
            },
        ],

        isArchived: false,
    })

    .populate(
        'createdBy',
        'name email role'
    )

    .populate(
        'assignedOperator',
        'name email'
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




// UPDATE ORDER STATUS

const updateOrderStatus =
catchAsyncError(
async (req, res, next) => {

    const {

        status,

    } = req.body;



    const order =
    await Order.findOne({

        $or: [

            {
                _id:
                req.params.id,
            },

            {
                orderNumber:
                req.params.id,
            },
        ],

        isArchived: false,
    });



    if (!order) {

        return next(

            new ErrorHandler(
                "Order not found",
                404
            )
        );
    }



    order.status = status;



    // Auto Workflow Progress

    const progressMap = {

        "Received": 10,

        "In Review": 25,

        "Accepted": 40,

        "Production Started": 55,

        "Manufacturing": 70,

        "Quality Check": 85,

        "Packaging": 92,

        "Dispatched": 97,

        "Delivered": 100,

        "Rejected": 0,
    };


    order.workflow.progress =
    progressMap[status] || 0;


    order.workflow.currentStage =
    status;


    await order.save();



    res.status(200).json({

        success: true,

        action:
        'update_status',

        severity:
        'info',

        title:
        'Workflow Status Updated',

        description:
        `Order ${order.orderNumber} moved to ${status}.`,

        data: order,
    });
});




// ASSIGN OPERATOR

const assignOperator =
catchAsyncError(
async (req, res, next) => {

    const {

        operatorId,

    } = req.body;



    const order =
    await Order.findOne({

        $or: [

            {
                _id:
                req.params.id,
            },

            {
                orderNumber:
                req.params.id,
            },
        ],

        isArchived: false,
    });



    if (!order) {

        return next(

            new ErrorHandler(
                "Order not found",
                404
            )
        );
    }



    order.assignedOperator =
    operatorId;


    await order.save();



    const updatedOrder =
    await Order.findById(
        order._id
    )

    .populate(
        'assignedOperator',
        'name email'
    );



    res.status(200).json({

        success: true,

        action:
        'assign_operator',

        severity:
        'info',

        title:
        'Operator Assigned',

        description:
        `Operator assigned to ${order.orderNumber}.`,

        data:
        updatedOrder,
    });
});




// DELETE ORDER
// Soft Delete

const deleteOrder =
catchAsyncError(
async (req, res, next) => {

    const order =
    await Order.findOne({

        $or: [

            {
                _id:
                req.params.id,
            },

            {
                orderNumber:
                req.params.id,
            },
        ],

        isArchived: false,
    });



    if (!order) {

        return next(

            new ErrorHandler(
                "Order not found",
                404
            )
        );
    }



    order.isArchived = true;

    await order.save();



    res.status(200).json({

        success: true,

        action:
        'delete_order',

        severity:
        'warning',

        title:
        'Order Archived',

        description:
        `${order.orderNumber} archived successfully.`,
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