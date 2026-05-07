const mongoose = require('mongoose');

const qualityLogSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    note: {
      type: String,
      required: true,
      trim: true,
    },

    inspectionStatus: {
      type: String,
      enum: ["Passed", "Failed", "Pending"],
      default: "Pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    attachments: [
      {
        type: String,
      },
    ],

    remarks: {
      type: String,
      default: "",
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const QualityLog = mongoose.model("QualityLog", qualityLogSchema);

module.exports =  QualityLog;