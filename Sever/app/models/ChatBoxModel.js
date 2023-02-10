const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
 
const ChatBoxModel = new Schema({ 
    adminGroup: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    nameGroupChat: { type:String , default:"Chat box" },
    isGroupChat: { type: Boolean, default: false },
    members: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
        } 
    ], 
    content: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Message"
        }
    ],   
},{
    timestamps: true, //auto return time create 
});
  


module.exports = mongoose.model('ChatBox', ChatBoxModel);
