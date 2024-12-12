const Event = require("../models/event");
const addNewEvent = async (req, res) => {
    Event.create(req.body)
    res.send({msg: 'Event  has been created'})
  };
  const getAllEvents = async (req, res) => {
    const data = await  Event.find()
    res.send(data)
  };
  module.exports = {addNewEvent, getAllEvents }; 