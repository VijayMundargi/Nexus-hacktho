const model = require('../config/gemini.js');

const catchAsyncError =
require('../middleware/catachAsyncError.js');

const Order =
require('../models/orderModel.js');

const QualityLog =
require('../models/QualityLog.js');


const aiChat = catchAsyncError(
async (req, res, next) => {
    console.log(req.body);

console.log(req.user);

    const { message } = req.body;


    const prompt = `
    You are an AI manufacturing assistant.

    Rules:
    - action must ONLY be:
      create_order
      update_status
      quality_update
      get_orders
      filter_orders
      analytics

    Extract:
    - action
    - partName
    - material
    - quantity
    - deadline
    - orderId
    - status
    - qualityNote
    - priority

    Return ONLY valid raw JSON.
    Do not use markdown.
    Do not use code blocks.
    Do not explain anything.

    Examples:

    User:
    Create 200 titanium flanges before July 20

    Response:
    {
      "action":"create_order",
      "partName":"Titanium Flange",
      "material":"Titanium",
      "quantity":200,
      "deadline":"2026-07-20",
      "priority":"Medium"
    }

    User:
    Show all accepted orders

    Response:
    {
      "action":"filter_orders",
      "status":"Accepted"
    }

    User:
    Give me analytics

    Response:
    {
      "action":"analytics"
    }

    User:
    Quality update on order 123 passed inspection

    Response:
    {
      "action":"quality_update",
      "orderId":"123",
      "qualityNote":"Passed inspection"
    }

    User Message:
    ${message}
    `;


    const result =
    await model.generateContent(
        prompt
    );

    const response =
    await result.response;

    const aiResponse =
    response.text();


    let parsedData;


    try {

        const cleanedResponse =
        aiResponse
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();


        console.log(
            'AI RESPONSE:',
            cleanedResponse
        );


        parsedData =
        JSON.parse(cleanedResponse);


        if (
            typeof parsedData === 'string'
        ) {

            parsedData =
            JSON.parse(parsedData);
        }

    } catch (error) {

        console.log(
            'PARSE ERROR:',
            error
        );

        console.log(
            'RAW AI RESPONSE:',
            aiResponse
        );

        return res.status(400).json({

            success: false,

            message:
            'Invalid AI JSON response',

            aiResponse,
        });
    }



    if (
        parsedData.action ===
        'create_order'
    ) {

        const order =
        await Order.create({

            partName:
            parsedData.partName,

            material:
            parsedData.material,

            quantity:
            parsedData.quantity,

            deadline:
            parsedData.deadline,

            priority:
            parsedData.priority ||
            'Medium',

            createdBy:
            req.user.id,
        });


        return res.status(201).json({

            success: true,

            type:
            'order_created',

            message:
            'Manufacturing order created successfully',

            order,
        });
    }



    if (
        parsedData.action ===
        'update_status'
    ) {

        const order =
        await Order.findById(
            parsedData.orderId
        );


        if (!order) {

            return res.status(404).json({

                success: false,

                message:
                'Order not found',
            });
        }


        order.status =
        parsedData.status;

        await order.save();


        return res.status(200).json({

            success: true,

            type:
            'status_updated',

            message:
            'Order status updated successfully',

            order,
        });
    }



    if (
        parsedData.action ===
        'quality_update'
    ) {

        const quality =
        await QualityLog.create({

            orderId:
            parsedData.orderId,

            note:
            parsedData.qualityNote,

            createdBy:
            req.user.id,
        });


        const order =
        await Order.findById(
            parsedData.orderId
        );


        if (order) {

            order.latestQualityNote =
            parsedData.qualityNote;

            await order.save();
        }


        return res.status(201).json({

            success: true,

            type:
            'quality_logged',

            message:
            'Quality report logged successfully',

            quality,
        });
    }



    if (
        parsedData.action ===
        'get_orders'
    ) {

        const orders =
        await Order.find()
        .sort({
            createdAt: -1,
        });


        return res.status(200).json({

            success: true,

            type:
            'all_orders',

            totalOrders:
            orders.length,

            orders,
        });
    }



    if (
        parsedData.action ===
        'filter_orders'
    ) {

        const filter = {};


        if (
            parsedData.status
        ) {

            filter.status =
            parsedData.status;
        }


        if (
            parsedData.priority
        ) {

            filter.priority =
            parsedData.priority;
        }


        const orders =
        await Order.find(filter)
        .sort({
            createdAt: -1,
        });


        return res.status(200).json({

            success: true,

            type:
            'filtered_orders',

            totalOrders:
            orders.length,

            orders,
        });
    }



    if (
        parsedData.action ===
        'analytics'
    ) {

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


        return res.status(200).json({

            success: true,

            type:
            'analytics',

            analytics: {

                totalOrders,

                acceptedOrders,

                reviewOrders,

                receivedOrders,
            },
        });
    }



    return res.status(200).json({

        success: true,

        message:
        'AI response processed',

        aiResponse:
        parsedData,
    });
});



module.exports = {
    aiChat,
};