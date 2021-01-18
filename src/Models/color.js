const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    enName: {
      type: String,
      required: true,
    },
    prName: { type: String, required: true },
    colorCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose("Color", colorSchema);
