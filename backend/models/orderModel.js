const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
{
    // =========================================
    // HUMAN READABLE ORDER ID
    // =========================================

    orderNumber: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },

    // =========================================
    // PRODUCT CODE
    // Example:
    // TIT-FLG-80MM
    // =========================================

    productCode: {
        type: String,
        default: '',
        uppercase: true,
        trim: true,
    },

    // =========================================
    // BASIC ORDER DETAILS
    // =========================================

    partName: {
        type: String,
        required: true,
        trim: true,
    },

    material: {
        type: String,
        required: true,
        trim: true,
    },

    quantity: {
        type: Number,
        required: true,
        min: 1,
    },

    deadline: {
        type: Date,
        required: true,
    },

    // =========================================
    // ORDER STATUS
    // =========================================

    status: {
        type: String,

        enum: [

            "Received",

            "In Review",

            "Accepted",

            "Production Started",

            "Manufacturing",

            "Quality Check",

            "Packaging",

            "Dispatched",

            "Delivered",

            "Rejected",
        ],

        default: "Received",
    },

    // =========================================
    // DESCRIPTION
    // =========================================

    description: {
        type: String,
        default: "",
        trim: true,
    },

    // =========================================
    // PRIORITY
    // =========================================

    priority: {
        type: String,

        enum: [

            "Low",

            "Medium",

            "High",

            "Critical",
        ],

        default: "Medium",
    },

    // =========================================
    // AI GENERATED NOTES
    // =========================================

    aiNotes: {
        type: String,
        default: '',
    },

    // =========================================
    // QUALITY NOTE
    // =========================================

    latestQualityNote: {
        type: String,
        default: "",
    },

    // =========================================
    // MANUFACTURING SPECIFICATIONS
    // =========================================

    specifications: {

        boreSize: {
            type: String,
            default: '',
        },

        dimensions: {
            type: String,
            default: '',
        },

        finishType: {
            type: String,
            default: '',
        },

        tolerance: {
            type: String,
            default: '',
        },
    },

    // =========================================
    // WORKFLOW TRACKING
    // =========================================

    workflow: {

        currentStage: {
            type: String,
            default: 'Order Received',
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        estimatedCompletion: {
            type: Date,
        },
    },

    // =========================================
    // USER RELATIONS
    // =========================================

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    assignedOperator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    // =========================================
    // MANUFACTURING ANALYTICS
    // =========================================

    analytics: {

        estimatedCost: {
            type: Number,
            default: 0,
        },

        productionHours: {
            type: Number,
            default: 0,
        },

        defectCount: {
            type: Number,
            default: 0,
        },

        qualityScore: {
            type: Number,
            default: 100,
        },
    },

    // =========================================
    // AI METADATA
    // =========================================

    aiMetadata: {

        extractedByAI: {
            type: Boolean,
            default: false,
        },

        aiConfidence: {
            type: Number,
            default: 0,
        },

        sourcePrompt: {
            type: String,
            default: '',
        },
    },

    // =========================================
    // SOFT DELETE
    // =========================================

    isArchived: {
        type: Boolean,
        default: false,
    },

},
{
    timestamps: true,
});



// =========================================
// AUTO GENERATE ORDER NUMBER
// =========================================

orderSchema.pre(
    'validate',
    async function () {

        // Skip if already exists
        if (this.orderNumber) {
            return;
        }

        const Order =
        mongoose.model('Order');

        // Count existing orders
        const totalOrders =
        await Order.countDocuments();

        const nextNumber =
        totalOrders + 1;

        const year =
        new Date().getFullYear();

        // Example:
        // ORD-2026-0001

        this.orderNumber =
        `ORD-${year}-${String(nextNumber)
        .padStart(4, '0')}`;
    }
);



// =========================================
// AUTO GENERATE PRODUCT CODE
// =========================================

orderSchema.pre(
    'save',
    async function () {

        if (!this.productCode) {

            const materialCode =
            this.material
            ?.substring(0, 3)
            ?.toUpperCase() || 'MAT';

            const partNameWords =
            this.partName
            ?.split(' ') || [];

            const partCode =
            partNameWords.length > 1
            ? partNameWords[1]
                ?.substring(0, 3)
                ?.toUpperCase()
            : partNameWords[0]
                ?.substring(0, 3)
                ?.toUpperCase() || 'PRD';

            const boreCode =
            this.specifications
            ?.boreSize
            ?.replace(/\s/g, '')
            ?.toUpperCase() || 'STD';

            this.productCode =
            `${materialCode}-${partCode}-${boreCode}`;
        }
    }
);



// =========================================
// INDEXES
// =========================================

orderSchema.index({
    status: 1,
});

orderSchema.index({
    priority: 1,
});

orderSchema.index({
    createdAt: -1,
});

orderSchema.index({
    productCode: 1,
});



// =========================================
// MODEL
// =========================================

const Order = mongoose.model(
    "Order",
    orderSchema
);

module.exports = Order;