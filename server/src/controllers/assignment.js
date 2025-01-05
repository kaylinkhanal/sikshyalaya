const Assignment = require("../models/assignment");
const addNewAssignment = async (req, res) => {
    Assignment.create(req.body)
    res.send({msg: 'Assignment  has been created'})
  };

  module.exports = {addNewAssignment }; 