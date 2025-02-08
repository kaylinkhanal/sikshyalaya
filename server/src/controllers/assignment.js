const Assignment = require("../models/assignment");
const Question = require("../models/question");
const Section = require("../models/section");
const Submission = require("../models/submission");
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





  const  getAssignmentsByUserType= async(req,res)=>{
    let assignment
    if(req.query.user === 'teacher'){
       assignment = await Assignment.find({createdBy: req.query.teacherId})
    }else{
       const section  = await Section.findOne({students: req.query.userId})
       assignment = await Assignment.find({section: section._id,subject:req.query.subjectId }).populate('questionsSet').populate('createdBy').populate('subject')
    }

    res.json(assignment)
  }





  const  submitAssignments= async(req,res)=>{
    const data = await Submission.create(req.body)
    res.json("Assignments Submitted!!")
  }

  module.exports = {addNewAssignment,getAssignmentsByUserType,submitAssignments}; 
