const express = require("express");
const router = express.Router();
const { addNewSubmission ,getAllAssingmentSubmission} = require('../controllers/submission');
  router.post('/submissions', addNewSubmission)
  router.get('/submissions', getAllAssingmentSubmission)

  
module.exports = router