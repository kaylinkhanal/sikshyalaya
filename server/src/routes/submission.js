const express = require("express");
const router = express.Router();
const { addNewSubmission ,getAllAssignmentSubmission} = require('../controllers/submission');
  router.post('/submissions', addNewSubmission)
  router.get('/submissions', getAllAssignmentSubmission)

  
module.exports = router