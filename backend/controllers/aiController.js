const model =
require('../config/gemini.js');

const catchAsyncError =
require('../middleware/catachAsyncError.js');

const Order =
require('../models/orderModel.js');

const QualityLog =
require('../models/QualityLog.js');




// ==========================================
// AI RESPONSE BUILDER
// ==========================================

const buildAIResponse = ({
    action,
    severity = 'info',
    title,
    description,
    data = null,
    meta = {},
}) => {

    return {

        success: true,

        action,

        severity,

        title,

        description,

        timestamp:
        new Date(),

        meta,

        data,
    };
};




// ==========================================
// GEMINI RETRY SYSTEM
// ==========================================

const generateWithRetry = async (
    prompt,
    retries = 3
) => {

    for (
        let i = 0;
        i < retries;
        i++
    ) {

        try {

            const result =
            await model.generateContent(
                prompt
            );

            return result;

        } catch (error) {

            if (
                error.status === 503 &&
                i < retries - 1
            ) {

                console.log(
                    `Gemini overloaded. Retrying...`
                );

                await new Promise(
                    resolve =>
                    setTimeout(
                        resolve,
                        2000
                    )
                );

            } else {

                throw error;
            }
        }
    }
};




// ==========================================
// AI CHAT
// ==========================================

const aiChat =
catchAsyncError(
async (req, res, next) => {

    try {

        const { message } =
        req.body;




        const prompt = `
        You are an AI manufacturing assistant.

        Return ONLY valid JSON.

        Allowed actions:
        - create_order
        - update_status
        - quality_update
        - get_orders
        - filter_orders
        - analytics

        IMPORTANT:
        Use orderNumber instead of MongoDB IDs.

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
          "priority":"Medium",
          "specifications":{
            "boreSize":"80mm"
          }
        }

        User:
        Mark ORD-2026-0001 as accepted

        Response:
        {
          "action":"update_status",
          "orderNumber":"ORD-2026-0001",
          "status":"Accepted"
        }

        User:
        Quality update on ORD-2026-0001 passed inspection

        Response:
        {
          "action":"quality_update",
          "orderNumber":"ORD-2026-0001",
          "qualityNote":"Passed inspection"
        }

        User:
        Show all accepted orders

        Response:
        {
          "action":"filter_orders",
          "status":"Accepted"
        }

        User Message:
        ${message}
        `;




        // ==========================================
        // GEMINI RESPONSE
        // ==========================================

        const result =
        await generateWithRetry(
            prompt
        );

        const response =
        await result.response;

        const aiResponse =
        response.text();




        // ==========================================
        // PARSE RESPONSE
        // ==========================================

        let parsedData;

        try {

            const cleanedResponse =
            aiResponse
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

            parsedData =
            JSON.parse(cleanedResponse);

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

                action:
                'parse_error',

                severity:
                'error',

                title:
                'AI Parsing Failed',

                description:
                'AI returned invalid JSON.',
            });
        }




        // ==========================================
        // CREATE ORDER
        // ==========================================

        if (
            parsedData.action ===
            'create_order'
        ) {

            const order =
            await Order.create({

                partName:
                parsedData.partName
                || 'Custom Part',

                material:
                parsedData.material
                || 'Steel',

                quantity:
                parsedData.quantity
                || 1,

                deadline:
                parsedData.deadline
                || new Date(),

                priority:
                parsedData.priority
                || 'Medium',

                specifications:
                parsedData.specifications || {},

                description:
                parsedData.description || '',

                createdBy:
                req.user.id,

                workflow: {

                    currentStage:
                    'Received',

                    progress: 10,

                    estimatedCompletion:
                    parsedData.deadline
                    || new Date(),
                },
            });




            return res.status(201).json(

                buildAIResponse({

                    action:
                    'create_order',

                    severity:
                    'success',

                    title:
                    'Manufacturing Order Created',

                    description:
                    `Order ${order.orderNumber} successfully created.`,

                    data: order,
                })
            );
        }




        // ==========================================
        // UPDATE STATUS
        // ==========================================

        if (
            parsedData.action ===
            'update_status'
        ) {

            const order =
            await Order.findOne({

                orderNumber:
                parsedData.orderNumber,
            });




            if (!order) {

                return res.status(404).json({

                    success: false,

                    action:
                    'update_status',

                    severity:
                    'error',

                    title:
                    'Order Not Found',

                    description:
                    `No order found with number ${parsedData.orderNumber}`,
                });
            }




            order.status =
            parsedData.status;




            const progressMap = {

                "Received": 10,

                "In Review": 25,

                "Accepted": 40,

                "Manufacturing": 70,

                "Quality Check": 85,

                "Packaging": 92,

                "Dispatched": 97,

                "Delivered": 100,

                "Rejected": 0,
            };




            order.workflow.progress =
            progressMap[
                parsedData.status
            ] || 0;




            order.workflow.currentStage =
            parsedData.status;




            await order.save();




            return res.status(200).json(

                buildAIResponse({

                    action:
                    'update_status',

                    severity:
                    'info',

                    title:
                    'Workflow Status Updated',

                    description:
                    `${order.orderNumber} moved to ${parsedData.status}.`,

                    data: order,
                })
            );
        }




        // ==========================================
        // QUALITY UPDATE
        // ==========================================

        if (
            parsedData.action ===
            'quality_update'
        ) {

            const order =
            await Order.findOne({

                orderNumber:
                parsedData.orderNumber,
            });




            if (!order) {

                return res.status(404).json({

                    success: false,

                    action:
                    'quality_update',

                    severity:
                    'error',

                    title:
                    'Order Not Found',

                    description:
                    `No order found with number ${parsedData.orderNumber}`,
                });
            }




            const quality =
            await QualityLog.create({

                orderId:
                order._id,

                note:
                parsedData.qualityNote,

                createdBy:
                req.user.id,
            });




            order.latestQualityNote =
            parsedData.qualityNote;

            await order.save();




            return res.status(201).json(

                buildAIResponse({

                    action:
                    'quality_update',

                    severity:
                    'success',

                    title:
                    'Quality Inspection Logged',

                    description:
                    `Inspection logged for ${order.orderNumber}.`,

                    data: {

                        quality,

                        order,
                    },
                })
            );
        }




        // ==========================================
        // GET ORDERS
        // ==========================================

        if (
            parsedData.action ===
            'get_orders'
        ) {

            const orders =
            await Order.find()
            .sort({
                createdAt: -1,
            });




            return res.status(200).json(

                buildAIResponse({

                    action:
                    'get_orders',

                    severity:
                    'info',

                    title:
                    'Orders Retrieved',

                    description:
                    `${orders.length} orders found.`,

                    data: orders,
                })
            );
        }




        // ==========================================
        // FILTER ORDERS
        // ==========================================

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




            return res.status(200).json(

                buildAIResponse({

                    action:
                    'filter_orders',

                    severity:
                    'info',

                    title:
                    'Matching Orders Found',

                    description:
                    `${orders.length} matching orders identified.`,

                    data: orders,
                })
            );
        }




        // ==========================================
        // ANALYTICS
        // ==========================================

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




            return res.status(200).json(

                buildAIResponse({

                    action:
                    'analytics',

                    severity:
                    'info',

                    title:
                    'Operational Analytics',

                    description:
                    'Enterprise analytics generated successfully.',

                    data: {

                        totalOrders,

                        acceptedOrders,

                        reviewOrders,

                        receivedOrders,
                    },
                })
            );
        }




        // ==========================================
        // UNKNOWN ACTION
        // ==========================================

        return res.status(400).json({

            success: false,

            action:
            'unknown',

            severity:
            'warning',

            title:
            'Unknown Request',

            description:
            'AI could not understand the request.',
        });

    } catch (error) {

        console.log(
            'AI CHAT ERROR:',
            error
        );




        return res.status(500).json({

            success: false,

            action:
            'server_error',

            severity:
            'error',

            title:
            'Internal Server Error',

            description:
            'AI service temporarily unavailable.',
        });
    }
});




module.exports = {
    aiChat,
};