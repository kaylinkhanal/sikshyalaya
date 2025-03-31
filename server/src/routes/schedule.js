const express = require("express");
const { saveSchedule, fetchSchedule } = require("../controllers/schedule");
const router = express.Router();

router.post('/schedule',saveSchedule)
router.get('/schedule',fetchSchedule)

module.exports = router;