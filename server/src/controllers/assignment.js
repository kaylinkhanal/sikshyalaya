const Assignment = require("../models/assignment");
const Question = require("../models/question");
const Section = require("../models/section");
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





  const  getAssignments= async(req,res)=>{
    const section  = await Section.findOne({students: req.query.userId})
    console.log(req.query, section)
    const assignment = await Assignment.find({section: section._id,subject:req.query.subjectId }).populate('questionsSet').populate('createdBy').populate('subject')
    res.json(assignment)
  }
  module.exports = {addNewAssignment,getAssignments }; 
