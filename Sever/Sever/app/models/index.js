// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const db = {};
// db.mongoose = mongoose;
//     db.user = require("./UserModel");
//     db.role = require("./role"); 
//     db.ROLES = ["user", "admin", "moderator"];
    // module.exports = db;
const User = require('./UserModel');
const Post = require('./PostModel');
const ChatBox = require('./ChatBoxModel');
const Message = require('./MessageModel');
const Note = require('./NoteModel');
const Information = require('./InformationModel');
module.exports = {
    User,
    Note,
    Post,
    ChatBox,
    Message,
    Information
};
