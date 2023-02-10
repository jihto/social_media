const express = require('express'); 
const router = express.Router(); 
const MessageController = require('../app/controllers/MessageController');

router.get('/:idChatBox', MessageController.fetchMessage);  
router.post('/sentMessage', MessageController.sending);  
router.put('/changeMessage', MessageController.change);

module.exports = router;