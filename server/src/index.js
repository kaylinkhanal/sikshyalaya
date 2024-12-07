const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()


const port = process.env.PORT
const UserRoute = require('./routes/user')
const ClassRoute = require('./routes/class')
const SubjectRoute = require('./routes/subject')

const dbConnect = require('./db/connection');
dbConnect()

app.use(express.json())
app.use(cors())
app.use(UserRoute)
app.use(ClassRoute)
app.use(SubjectRoute)
// http://localhost:8000/subject/{sectionId}/subject


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// MONGODB

// -> database: space to store/manage data
//         -> SQL                         vs                 noSQL
//           table                                      collection
//           database                                   database
//           rows and columns                           document (key:value)
//           tabular form                               object based
//           User.findAll()--->ORM(sequalize)           User.find()  ---> ODM(Object Data Modeling) (mongoose)
//           relational DB                              schemaless/non-relationaldb














