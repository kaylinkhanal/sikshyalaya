const Schedule = require("../models/schedule");

const saveSchedule = async(req,res)=>{
  const schedule = await Schedule.create(req.body);
  res.send({ msg: 'Schedule created!', data: schedule });
}


const fetchSchedule = async(req,res)=>{
  const schedules = await Schedule.find();
  res.status(200).send(schedules);
}

module.exports = {saveSchedule,fetchSchedule}