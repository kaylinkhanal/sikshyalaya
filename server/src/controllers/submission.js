
const Submission = require("../models/submission");
const addNewSubmission = async (req, res) => {
    await Submission.create(req.body)
    return res.json({msg: "Asignments submitted completed!!"})
  };

  const  getAllAssingmentSubmission= async(req,res)=>{
      const data  = await Submission.find()
      return res.json(data)
  }

  module.exports = { addNewSubmission ,getAllAssingmentSubmission} 
