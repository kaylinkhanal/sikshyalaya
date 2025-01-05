const express = require("express");
const router = express.Router();
const { addNewAssignment } = require('../controllers/assignment');
  router.post('/assignments', addNewAssignment)
  
module.exports = router