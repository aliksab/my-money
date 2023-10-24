const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    type: { type: String, enum: ["debit", "credit", "investing"] },
    name: { type: String },
    description: { type: String },
    amount: { type: Number },
    image: String,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Target", schema);
