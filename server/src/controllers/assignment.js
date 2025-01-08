const Assignment = require("../models/assignment");
const Question = require("../models/question");
const addNewAssignment = async (req, res) => {
  const {questionsSet, ...payload} = req.body
  const questionIds = await Promise.all(
    questionsSet.map(async (item) => {
      const createdQuestion = await Question.create(item);
      return createdQuestion._id;
    })
  );

  Assignment.create({...payload, questionsSet: questionIds})
  res.send("Assignment Created!!")

  };

  module.exports = {addNewAssignment }; 
