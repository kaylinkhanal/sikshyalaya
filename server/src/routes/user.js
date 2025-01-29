const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getAllUser, approveUser, rejectUser,getNotifications } = require('../controllers/user');

  router.post('/register', registerUser)
  router.post('/login', loginUser)
  router.get('/users', getAllUser)
  router.patch('/approve-user/:userId', approveUser)
  router.patch('/reject-user/:userId', rejectUser)
  router.get('/users/:userId/notifications',getNotifications)
  
module.exports = router
