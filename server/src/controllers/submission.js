
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


//     const Submission = require('./models/Submission');
// const teacherId = 'yourTeacherId';

// Submission.aggregate([
//   {
//     $lookup: {
//       from: 'assignments', // Collection name for assignments
//       localField: 'assignment',
//       foreignField: '_id',
//       as: 'assignment'
//     }
//   },
//   { $unwind: '$assignment' }, // Deconstruct the assignment array
//   {
//     $lookup: {
//       from: 'users', // Collection name for users
//       localField: 'assignment.createdBy',
//       foreignField: '_id',
//       as: 'teacher'
//     }
//   },
//   { $unwind: '$teacher' }, // Deconstruct the teacher array
//   { $match: { 'teacher._id': mongoose.Types.ObjectId(teacherId) } }, // Filter by teacherId
//   {
//     $project: { // Optional: Select the fields you need
//         _id: 1,
//         student: 1,
//         answers: 1,
//         score: 1,
//         remarks: 1,
//         assignment: {
//             _id: 1,
//             // ... other assignment fields you want
//         },
//         teacher: {
//             _id: 1,
//             name: 1,
//             // ... other teacher fields you want
//         }
//     }
//   }
// ])
//   .then(submissions => {
//     console.log(submissions);
//   })
//   .catch(err => {
//     console.error(err);
//   });
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
