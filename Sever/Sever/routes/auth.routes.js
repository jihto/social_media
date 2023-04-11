
const authUser = require("../app/controllers/auth.controller");

const express = require('express');
const router = express.Router();  

  router.post('/login',authUser.login);
  router.post('/token',authUser.Token);
  router.post('/register',authUser.register);
  router.put('/changePassword', authUser.changePassword);
 
  module.exports = router;