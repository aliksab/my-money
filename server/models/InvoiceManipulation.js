const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    type: { type: String, enum: ["profit", "expense"] },
    manipulation: {
      type: String,
      enum: ["bank", "food", "transport", "game", "sport", "other"],
    },
    description: { type: String },
    amount: { type: Number },
    invoiceId: { type: Schema.Types.ObjectId, ref: "Invoice", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("InvoiceManipulation", schema);
