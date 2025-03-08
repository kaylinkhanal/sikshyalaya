require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});



const { PORT } = process.env;
const UserRoute = require("./routes/user");
const ClassRoute = require("./routes/class");
const EventRoute = require("./routes/event");
const SubjectRoute = require("./routes/subject");
const ProductRoute = require("./routes/product");
const SubmissionRoute = require('./routes/submission')
const AssignmentRoute = require("./routes/assignment");



const dbConnect = require("./db/connection");
const Section = require("./models/section");
const User = require("./models/user");
dbConnect();


app.use(express.json());
app.use(cors());
app.use(UserRoute);
app.use(ClassRoute);
app.use(EventRoute);
app.use(SubjectRoute);
app.use(ProductRoute);
app.use(AssignmentRoute);
app.use(SubmissionRoute);



io.on('connection', (socket) => {
  socket.on('joinRoom', (userId)=>{
    console.log("User connected in the room is :", userId)
    socket.join(userId.toString())
  })


  socket.on('assignment',async (assignment, sectionId) => {
    try{
      const section = await Section.findById(sectionId)
      section.students.forEach((item)=>{ //send assingment alert for each students  of that section
        if(io.sockets.adapter.rooms.has(item.toString())){  //check if each students are online
          io.to(item.toString()).emit('assignment', assignment) //main part
        }else{
          console.log('User in the rooms does not belong to the section in which assingment is created')
        }
      })
   

    }catch(err){
      console.log(error)
    }
  });
  
});


const test = async()=>{
const user = await User.findById('67985fcf1b6dbbaf8c8d01e9')
user.pendingNotifications = false
user.save()
}


test()
// http://localhost:8000/subject/{sectionId}/subject

server.listen(PORT ?? 8080, () => {
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
