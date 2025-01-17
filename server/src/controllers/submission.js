
const { default: mongoose } = require("mongoose");
const Submission = require("../models/submission");
const Assignment = require("../models/assignment");
const addNewSubmission = async (req, res) => {
    await Submission.create(req.body)
    return res.json({msg: "Asignments submitted completed!!"})
  };

  const  getAllAssignmentSubmission= async(req,res)=>{
    const assignments = await Assignment.find({createdBy: req.query.teacherId})
    const assignmentsId = assignments.map(item=> item._id)
    const submissionList =await  Submission.find({assignment :{$in:assignmentsId} }).populate('student', 'fullName')
    return res.json(submissionList)
  }

  module.exports = { addNewSubmission ,getAllAssignmentSubmission} 
