const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const MessageModel = new Schema({ 
    sender: { type: mongoose.Schema.Types.ObjectId,ref: "User"},
    idChatBox: { type: mongoose.Schema.Types.ObjectId,ref: "ChatBox"},
    message: { type: String }
},{
    timestamps: true, //return auto time create 
});
 
module.exports = mongoose.model('Message', MessageModel);
