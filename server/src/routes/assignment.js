const express = require("express");
const router = express.Router();
const { addNewAssignment ,getAssignments} = require('../controllers/assignment');
  router.post('/assignments', addNewAssignment)
  router.get('/assignments', getAssignments)

  
module.exports = router