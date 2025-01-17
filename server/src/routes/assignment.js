const express = require("express");
const router = express.Router();
const { addNewAssignment ,getAssignmentsByUserType, submitAssignments} = require('../controllers/assignment');
  router.post('/assignments', addNewAssignment)
  router.get('/assignments', getAssignmentsByUserType)
  router.post('/submit-assignments', submitAssignments)

  
module.exports = router