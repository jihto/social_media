const express = require('express');
const router = express.Router();

const PostController = require('../app/controllers/PostController');
const {upload} = require('../app/midddleware/ImgUrl'); 
 
// router.put('/restore/:id', PostController.restore); 

router.delete('/delete/:id', PostController.delete); 
router.put('/update/:id', upload.array('uploadedImages',10), PostController.update);
router.post('/create', upload.array('uploadedImages',10), PostController.create); 
router.get('/:id', PostController.allPostOfUser);
router.get('/', PostController.allPost);

router.put('/like', PostController.likePost);
router.put('/unLike', PostController.unLikePost);

router.post('/savePost', PostController.savePost);
router.post('/unSavePost', PostController.unSavePost);
router.get('/dataSavePost/:id', PostController.dataSavePost);

router.post('/hide/:id', PostController.hide);
router.post('/show/:id', PostController.show); 

module.exports = router;