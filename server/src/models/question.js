const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  title: { type: String },
  marks: Number
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;


