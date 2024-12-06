const Event = require("../models/event");

const addEvent = async (req, res) => {
  try {
    const { title, description, time, date } = req.body;
    const newEvent = new Event({
      title,
      description,
      time,
      date,
    });
    await newEvent.save();
    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error adding event", error });
  }
};


const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

module.exports = { addEvent, getAllEvents };
