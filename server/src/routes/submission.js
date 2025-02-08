const express = require("express");
const router = express.Router();
const { addNewSubmission ,getAllAssignmentSubmission,addSubmissionScores} = require('../controllers/submission');
  router.post('/submissions', addNewSubmission)
  router.get('/submissions', getAllAssignmentSubmission)
  router.put('/score-submission/:submissionId', addSubmissionScores)

  
  
module.exports = router