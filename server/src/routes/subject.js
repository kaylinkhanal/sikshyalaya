const express = require("express");
const { getsSubjectBySectionId, postNewSubjectInSectionId, getAllSubjects,getSubjectsOfParticularTeacher } = require("../controllers/subject");
const router = express.Router();

router.post("/sections/:sectionId/subjects", postNewSubjectInSectionId);

// GET route for fetching subjects by sectionId
router.get("/sections/:sectionId/subjects", getsSubjectBySectionId);
router.get("/teachers/:teacherId/subjects", getSubjectsOfParticularTeacher);

router.get('/subjects',getAllSubjects)



module.exports = router;
