const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    assignId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
