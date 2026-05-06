import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    partName: {
      type: String,
      required: true,
      trim: true,
    },

    material: {
      type: String,
      required: true,
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

    status: {
      type: String,
      enum: ["Received", "In Review", "Accepted"],
      default: "Received",
    },

    description: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedOperator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    latestQualityNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;