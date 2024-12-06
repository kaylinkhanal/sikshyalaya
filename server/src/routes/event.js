const express = require("express");
const { addEvent, getAllEvents } = require("../controllers/event");
const router = express.Router();


router.get("/events", getAllEvents);
router.post("/events", addEvent);

module.exports = router;
