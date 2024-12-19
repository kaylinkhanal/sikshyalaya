require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { PORT } = process.env;
const UserRoute = require("./routes/user");
const ClassRoute = require("./routes/class");
const EventRoute = require("./routes/event");
const SubjectRoute = require("./routes/subject");

const dbConnect = require("./db/connection");
dbConnect();

app.use(express.json());
app.use(cors());
app.use(UserRoute);
app.use(ClassRoute);
app.use(EventRoute);
app.use(SubjectRoute);
const Answer = require('./models/answer')

Answer.create({
  answerContent: "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
  question: "67637c73bfb4b8fa3747e7f4",
  answeredBy: "673565d4a75f172d639afba4"
});
// http://localhost:8000/subject/{sectionId}/subject

app.listen(PORT ?? 8080, () => {
  console.log(`Example app listening on port ${PORT ?? 8080}`);
});

// MONGODB

// -> database: space to store/manage data
//         -> SQL                         vs                 noSQL
//           table                                      collection
//           database                                   database
//           rows and columns                           document (key:value)
//           tabular form                               object based
//           User.findAll()--->ORM(sequalize)           User.find()  ---> ODM(Object Data Modeling) (mongoose)
//           relational DB                              schemaless/non-relationaldb
