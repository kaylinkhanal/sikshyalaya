const Assignment = require("../models/assignment");

// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new assignment
const addNewAssignment = async (req, res) => {
  const assignment = new Assignment({
    ...req.body,
    createdBy: req.user._id, // Assuming you have user authentication middleware
  });

  try {
    const newAssignment = await assignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get a single assignment by ID
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update an assignment by ID
const updateAssignmentById = async (req, res) => {
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.assignmentId,
      req.body,
      { new: true }
    );
    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an assignment by ID
const deleteAssignmentById = async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(
      req.params.assignmentId
    );
    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllAssignments,
  addNewAssignment,
  getAssignmentById,
  updateAssignmentById,
  deleteAssignmentById,
};
