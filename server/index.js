const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/sikshyalayaDb');

const { Schema } = mongoose;
// email, phoneNumber, password, role, fullName, fatherName, motherName)
const userSchema = new Schema({
  email: String, 
  phoneNumber: Number,
  password: String,
  role: {
    type: String,
    enum : ['student','teacher', 'admin'],
    default: 'student'
  },
  fullName:String,
  fatherName: String,
  motherName: String
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
    res.send(['ram','shyam','hari'])
  })

app.get('/products', (req, res) => {
res.send(['hawkins','baltra'])
})

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














