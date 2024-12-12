const express = require("express");
const router = express.Router();
const { getAllEvents, addNewEvent } = require('../controllers/event');
  router.post('/events', addNewEvent)
  router.get('/events', getAllEvents)
  
module.exports = router