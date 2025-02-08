const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [{ question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" }, answer: String }],
  score: {type:Number, default:0},
  remarks: {type:String ,default: ''}
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;