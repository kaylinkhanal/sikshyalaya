
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
    const submissionList =await  Submission.find({assignment :{$in:assignmentsId} }).populate('student', 'fullName').populate('assignment').populate({ 
      path: 'assignment',
      populate: {
        path: 'subject',
        model: 'Subject'
      } 
   }).populate({ 
    path: 'answers',
    populate: {
      path: 'question',
      model: 'Question'
    } 
 })

    return res.json(submissionList)
  }


  const addSubmissionScores = async (req, res) => {
    console.log(req.params.submissionId)
   const submissionItem = await Submission.findById(req.params.submissionId)
   console.log(submissionItem)
   submissionItem.remarks = req.body.remarks
   submissionItem.score = req.body.score
   submissionItem.save()
   return res.json({msg: "Scores submitted completed!!"})
  };

  
  module.exports = { addNewSubmission ,getAllAssignmentSubmission,addSubmissionScores} 
