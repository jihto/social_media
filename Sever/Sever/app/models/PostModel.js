const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const  mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const PostModel = new Schema({
    nameUser:{ type : mongoose.Schema.Types.ObjectId,ref: "User"},
    description: { type : String},
    img: [{ type : String}],
    slug: { type : String,slug: 'img' },
    like:[{ type : mongoose.Schema.Types.ObjectId,unique: true,ref: "User", default:[]}],
    hide:[{ type : mongoose.Schema.Types.ObjectId,unique: true,ref: "User", default:[]}]
},{
    timestamps: true, //return auto time create 
});


mongoose.plugin(slug);

PostModel.plugin(mongoose_delete,{
    deletedAt: true,
    overrideMethods: 'all', 
});

module.exports = mongoose.model('Post', PostModel);
