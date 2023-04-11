const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const NoteModel = new Schema({
    user: { type : mongoose.Schema.Types.ObjectId,ref: "User"},
    textNote: { type: String}, 
    color: { type: String, default:""},
    createAt : {type:Date, default:Date.now },
    updateAt : {type:Date, default:Date.now },
}) 

NoteModel.plugin(mongoose_delete,{
    deletedAt: true,
    overrideMethods: 'all', 
});


module.exports = mongoose.model('Note',NoteModel);