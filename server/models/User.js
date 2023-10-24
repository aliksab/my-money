const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    secondName: { type: String },
    userName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    descriptions: { type: String },
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
