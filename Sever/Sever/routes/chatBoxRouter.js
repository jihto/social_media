const express = require('express');
const ChatBoxController = require('../app/controllers/ChatBoxController');
const router = express.Router(); 

router.get('/',ChatBoxController.fetchChatBox); 
router.post('/single',ChatBoxController.createSingleBox); 
router.post('/group',ChatBoxController.createGroupBox);
router.put('/rename',ChatBoxController.reName);
router.put('/addToGroup',ChatBoxController.addToGroup);
router.put('/removeFromGroup',ChatBoxController.removeFromGroup);


module.exports = router;