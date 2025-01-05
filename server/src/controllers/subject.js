const Class = require("../models/class");
const Section = require("../models/section");
const Subject = require("../models/subject");

const postNewSubjectInSectionId = async (req, res) => {
  const {sectionId: section} = req.params
 const createdSubject = await Subject.create({section, ...req.body })
  const classDetails = await Section.findOne({class:req.body.classId, _id:section })
  classDetails.teachers.push(req.body.teacher)
  classDetails.subjects.push(createdSubject._id)
  classDetails.save()
  res.send({msg: 'Subject created!!'})
};


const getsSubjectBySectionId = async (req, res) => {
 const data= await Subject.findById('674bd511d38271084ff09fca')
 console.log(data.teacher)
};

// getsSubjectBySectionId()

const getAllSubjects = async (req, res) => {
  const data = await Subject.find()
  res.send(data)
};



const getSubjectsOfParticularTeacher = async (req, res) => {
  const data = await Subject.find({teacher:req.params.teacherId })
  res.send(data)
};





module.exports = {postNewSubjectInSectionId,getsSubjectBySectionId,getAllSubjects,getSubjectsOfParticularTeacher}