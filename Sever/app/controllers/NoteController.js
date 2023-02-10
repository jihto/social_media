const { Note } = require("../models");

class NoteController{
    allNote = async (req, res, next) => {
        try {
            const user = req.params.idUser;
            const result = await Note.find({ user });
            res.status(200).json(result);
        } catch (error) { 
            res.status(400)
            throw new Error(error.message)
        }
    }
    createNote = async (req, res, next) => {
        try {
            const { idUser, textNote, color } = req.body; 
            const newNote = await Note.create({ user: idUser, textNote, color});
            res.status(200).json({data: newNote, message: "Create note successful"}); 
        } catch (error) { 
            res.status(400).json({"message": `${error}`}); 
        } 
    }
    updateNote = async (req, res, next) => {
        try {
            const _id = req.params._id;
            const { newTextNote, color } = req.body;  
            const data = await Note.findOneAndUpdate({ _id }, {$set: {textNote: newTextNote, color }});
            res.status(200).json({ data, message: "Update Note Successful"})
        } catch (error) {
            res.status(400).json({"message": `${error}`}); 
        } 
    }
    deleteNote = async (req, res, next) => {
        try {
            const _id = req.params._id;
            const data = await Note.delete({ _id });
            res.status(200).json({data, message: "Delete Note Successful"})
        } catch (error) { 
            res.status(400).json({"message": `${error}`}); 
        } 
    }
}
module.exports = new NoteController;