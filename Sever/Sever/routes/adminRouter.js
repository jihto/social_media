const express = require('express');
const AdminController = require('../app/controllers/AdminController');
const router = express.Router();



router.get('/',AdminController.main);

module.exports = router;