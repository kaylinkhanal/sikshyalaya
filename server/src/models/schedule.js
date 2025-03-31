const mongoose = require("mongoose");
const { Schema } = mongoose;

const scheduleschema = new Schema({
  sectionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
  },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "subject" },
  dayOfWeek: { type: String },
  startTime: { type: Number },
  endTime: { type: Number },
});
const Schedule = mongoose.model("schedule ", scheduleschema);
module.exports = Schedule;
