const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const { upload } = require('../app/midddleware/ImgUrl');

router.get('/profile',userController.infoUser);  
router.put('/updateInfo',userController.updateInformation);

router.put('/addFollow',userController.addFollower);
router.put('/removeFollow',userController.removeFollower); 
router.get('/follower',userController.searchUser);  
router.put('/update',upload.single('imageURL'),userController.update); 
router.get('/:id',userController.main); 

module.exports = router;