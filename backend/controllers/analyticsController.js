const Order =
require('../models/orderModel.js');

const catchAsyncError =
require('../middleware/catachAsyncError.js');


const getAnalytics =
catchAsyncError(async (req, res) => {

    const totalOrders =
    await Order.countDocuments();

    const acceptedOrders =
    await Order.countDocuments({
        status: 'Accepted',
    });

    const reviewOrders =
    await Order.countDocuments({
        status: 'In Review',
    });

    const receivedOrders =
    await Order.countDocuments({
        status: 'Received',
    });


    res.status(200).json({

        success: true,

        analytics: {

            totalOrders,

            acceptedOrders,

            reviewOrders,

            receivedOrders,
        },
    });
});


module.exports = {
    getAnalytics,
};