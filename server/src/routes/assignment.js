const express = require("express");
const {
  addNewAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignmentById,
  deleteAssignmentById,
} = require("../controllers/assignment");
const router = express.Router();

// Create a new assignment
router.post("/assignments", addNewAssignment);

// Get all assignments
router.get("/assignments", getAllAssignments);

// Get a single assignment by ID
router.get("/assignments/:assignmentId", getAssignmentById);

// Update an assignment by ID
router.put("/assignments/:assignmentId", updateAssignmentById);

// Delete an assignment by ID
router.delete("/assignments/:assignmentId", deleteAssignmentById);

module.exports = router;
