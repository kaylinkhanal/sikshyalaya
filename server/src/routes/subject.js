const express = require("express");
const { getsSubjectBySectionId, postNewSubjectInSectionId } = require("../controllers/subject");
const router = express.Router();

router.post("/sections/:sectionId/subjects", postNewSubjectInSectionId);

// GET route for fetching subjects by sectionId
router.get("/sections/:sectionId/subjects", getsSubjectBySectionId);

module.exports = router;