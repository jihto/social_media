const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController'); 


router.get('/', homeController.home);
router.get('/dataUser', homeController.dataUser);

module.exports = router;