const mongoose = require("mongoose");
const { Schema } = mongoose;

const AssignmentSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    questionsSet:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", AssignmentSchema);

module.exports = Assignment;