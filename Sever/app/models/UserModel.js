const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, maxlength: 250},
    avatar: { type: String},
    storyMessage: { type: String},
    createAt : {type:Date, default:Date.now },
    updateAt : {type:Date, default:Date.now },
    information: { type: mongoose.Schema.Types.ObjectId,ref: "Information" },
    post:[
        { 
            type: mongoose.Schema.Types.ObjectId,ref: "Post"
        }
    ],
    email: { type: String },
    password: { type: String },
    token: { type: String },
    refreshToken: { type: String},
    follow:[
        { 
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: "User"
        }
    ],
    following: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: "User"
        }
    ], 
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    savePosts:[
        { 
            type: mongoose.Schema.Types.ObjectId,unique: true,ref: "Post" 
        }
    ], 
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('User',userSchema);