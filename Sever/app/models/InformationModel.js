const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const InfofmationModel = new Schema({ 
    user: { type: mongoose.Schema.Types.ObjectId,ref: "User"},
    workAt: {type: String, maxlength: 100, },
    location: { type: String, maxlength: 100,  },
    education: { type: String, maxlength: 100, },
    storyMessage: { type: String},
    isSingle: { type:Boolean, default:false },
    phoneNumber: {type: Number, maxlength: 15},
    mail:{ type:String, maxlength: 30 },
    socialMedia: [
        { 
            name:{ type: String },
            link:{ type: String }
        }
    ]
},{
    timestamps: true, //return auto time create 
});

module.exports = mongoose.model('Information', InfofmationModel);
