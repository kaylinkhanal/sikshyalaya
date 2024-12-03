const Section = require("../models/section");
const Subject = require("../models/subject");

const postNewSubjectInSectionId = async (req, res) => {
  const { sectionId: section } = req.params;
  const sub = await Subject.create({ section, ...req.body });
  console.log(sub);
  res.send({ msg: "Subject created!!", subject: sub });
};

const getsSubjectBySectionId = async (req, res) => {};

const getAllSubjects = async (req, res) => {
  const data = await Subject.find();
  res.send(data);
};

module.exports = {
  postNewSubjectInSectionId,
  getsSubjectBySectionId,
  getAllSubjects,
};
