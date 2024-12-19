const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema({
      answerContent: { type: String },
      question: {        type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      answeredBy: {   type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;


