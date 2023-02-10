const { User, Post } = require('../models');
const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
 

class PostController{
    allPost = async(req,res,next) => { 
        try {
            const posts = await Post.find()
            .populate({
                    path:'nameUser',
                    select: 'name avatar'
                })
            .populate({
                path:'like',
                select: 'name', 
            })     
            res.status(200).json(posts);
        } catch (error) {
            res.status(400)
            throw new Error(error.message) 
        } 
    }
    allPostOfUser = async(req,res,next) =>{
        try {
            const id = req.params.id; 
            const result = await Post.find({nameUser: id});
            res.status(200).json(result);
        } catch (error) {
            res.status(400)
            throw new Error(error.message) 
        }
    }
    create = async(req,res,next) => {
        try {
            const { description, _id } = req.body; 
            var file = req.files; 
            let arrayImage = new Array();
            for(let i= 0; i< file.length; i++){
                arrayImage.push(file[i].filename);
            } 
            const formData = { nameUser:_id, description, img:arrayImage };
            const newPost = await Post.create(formData);
            await User.findOneAndUpdate({ _id }, { $push: { post: newPost._id }});
            res.status(200).json({data:newPost, message:"Create post successfull"}); 
        } catch (error) {
            res.status(500).json({message: error.message})
        } 
    } 
    update = async(req,res,next) => { 
        try {
            const _id = req.params.id;
            const { description, imageRemove } = req.body; 
            const file = req.files;
            //create new array contain filename of image to save it in the database   
            let arrayImage = new Array();
            for(let i= 0; i< file.length; i++){
                arrayImage.push(file[i].filename);
            }       
            let data ;
            //Checking the value if any will save this field in the database
            if(description)
                data = await Post.updateOne({ _id }, {$set: {description }});
            if(Array.isArray(imageRemove) && imageRemove.length > 0)
                data = await Post.findOneAndUpdate({ _id },{ $pull: {img: { $in: imageRemove}}}); 
            if(arrayImage.length > 0) 
                data = await Post.updateOne({ _id },{$push: {img: { $each: arrayImage }}}); 
                
            res.status(200).json({data, message: "Update Post successfull"})
        } catch (error) {
            res.status(400)
            throw new Error(error.message) 
        }
    }
    delete = async(req,res,next) => { 
        try {
            const idPost = req.params.id;
            const postDelete =  await Post.delete({_id: idPost}); 
            res.status(200).json({data: _id, message:"Delete Successfull"});
        } catch (error) {
            res.status(500).json({message: "Delete fail"});
        }
    }
    strash(req,res,next){
        Post.findDeleted()
            .populate({
                path:'nameUser',
                select: 'name message'
            })
                .then(postDelete => res.render('posts/strash',{postDelete : mutipleMongooseToObject(postDelete)}))
                .catch(error => console.log(error));
    }
    restore(req,res,next){
        Post.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    } 
    likePost = async (req,res,next) =>{
        const {_id, idUser} = req.body;
        await Post.findOneAndUpdate({ _id },{ $addToSet: { like: idUser }})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(error => console.log(error)) 
    }
    unLikePost = async (req,res,next) =>{
        const {_id, idUser} = req.body;
        Post.updateOne({ _id }, { $pull: { like: idUser }})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(error => console.log(error)) 
    }
    savePost(req,res,next){
        const {idPost, idUser} = req.body;
        console.log("save");
        User.findOneAndUpdate({ _id: idUser },{ $addToSet: { savePosts: idPost }})
            .then((result) => {
                res.json(result);
            })
            .catch(error => console.log(error)); 
    } 
    unSavePost(req,res,next){
        const {idPost, idUser} = req.body;  
        console.log("unSave");

        User.updateOne({ _id: idUser },{ $pull: { savePosts: idPost }})
            .then((result) => {
                res.json(result);
            })
            .catch(error => console.log(error)); 
    } 
    dataSavePost = async (req,res,next) =>{  
        await User.find({_id:req.params.id})
                .populate({
                    path:'savePosts',
                    select: 'img description nameUser' 
                })
                .select("savePosts") 
                    .then(result => {  
                        res.status(200).json(result[0]);
                    })
                    .catch(error => console.log(error)) 
    }
    hide = async (req,res,next) =>{
        const idUser = req.body.idUser;
        const idPost = req.params.id; 
        await Post.findOneAndUpdate({ _id: idPost },{ $addToSet: { hide: idUser} })
            .then(result => res.status(200).json({message:"hide Successful"}))
            .catch(error => console.log(error)); 
    }
    show = async (req,res,next) =>{
        const idUser = req.body.idUser;
        const idPost = req.params.id; 
        await Post.updateOne({ _id: idPost },{ $pull : { hide: idUser }})
                .then(result => res.status(200).json({message:"show Successful"}))
                .catch(error => console.log(error)); 
    }
}

module.exports = new PostController;