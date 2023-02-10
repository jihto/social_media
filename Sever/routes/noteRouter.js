const express = require('express'); 
const NoteController = require('../app/controllers/NoteController');
const router = express.Router(); 

router.get('/:idUser',NoteController.allNote);  
router.post('/create',NoteController.createNote);
router.put('/update/:_id', NoteController.updateNote);
router.delete('/delete/:_id', NoteController.deleteNote);

module.exports = router;