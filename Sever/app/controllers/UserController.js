const { User, Post, Information } = require('../models');
var randtoken = require('rand-token'); 
const { removeUserFromArray, convertObjectToArray, convertArraytoObject } = require('../../util/removeUserFromArray');
const { mongooseToObject } = require('../../util/mongoose');


class UserController{
    main(req,res,next){
        User.findOne({_id:req.params.id})
            .populate({
                path:'information',
                select: 'workAt',
                strictPopulate: false
            })
            .select('id avatar follow following name information savePosts')
                .then(user => { 
                    res.json(user);
                })
                .catch(next);
    }
    infoUser = async (req, res, next) => {
        try {
            const _id = req.user.id;
            const profile = await Information.find({ user: _id }); 
            res.status(200).json((convertArraytoObject(profile)));
        } catch (error) {
            res.status(400).json({"message": `${error}`}); 
        }
    }
    updateInformation = async(req,res,next) =>{
        try {
            const { _id, type, content } = req.body; 
            const condition = `{${type}:${content}}`; 
            const result = await Information.find({ _id }, {$set: condition}); 
            res.status(200).json({ message: "Update Profile successful" })
        } catch (error) { 
            res.status(400).json({"message": `${error}`}); 
        }
    }
    searchUser = async (req, res, next) =>{ 
        const keyWord = 
            req.query.search 
                ?{
                    $or: [
                        {name: { $regex : req.query.search, $options:"i"}}, 
                        // {email: { $regex : req.query.search, $options:"i"}}
                    ]
                }
                :{ }    
        await User.find(keyWord).find({ _id : { $ne : req.user.id }}).select("name email storyMessage following")
            .then(result => res.status(200).json(result))
            .catch(next) 
    } 
    update = async(req,res,next) => {
        try {
            const { _id } = req.body;
            const avatar = req.file.filename; 
            await User.findOneAndUpdate({_id},{$set:{avatar}});
            res.status(200).json({data: avatar, message:"Update avatar successful"}); 
        } catch (error) {
            es.status(500).json({ message:"Update avatar fail"}); 
        } 
    }
    addFollower(req,res,next){
        const {userId, followerId} = req.body; 
        console.log("Follow Successfully"); 
        const updateUserFollow = User.findOneAndUpdate({_id:userId},{$addToSet:{follow:followerId }});
        const updateUserFollowing = User.findByIdAndUpdate({_id:followerId},{$addToSet:{following:userId }});
        Promise.all([updateUserFollow,updateUserFollowing])
            .then(([dataFollow,dataFollowing]) => {
                res.json("Follow Successfully");
            })
            .catch(next);  
    }
    removeFollower(req,res,next){
        const {userId,followerId} = req.body; 
        const updateUserFollow = User.updateOne({_id:userId},{$pull:{follow: followerId}});
        const updateUserFollowing = User.updateOne({_id:followerId},{$pull:{following: userId}});
        Promise.all([updateUserFollow,updateUserFollowing])
            .then(([dataFollow,dataFollowing]) => {
                res.json("unFollow Successfully");
            })
            .catch(next);  
    }
    dataFollower(req,res,next){
        const follower = User.findOne({_id:req.user.id})
                            .populate({
                                path:'follow',
                                select: '_id',
                                strictPopulate: false
                            })
                            .select("follow")
        const allUser = User.find({})
                            .select('name avatar')
        Promise.all([follower,allUser])
            .then(([dataFollower, allDataUser]) => { 
                const allFollower = convertObjectToArray(dataFollower.follow,"_id");
                const allUser = removeUserFromArray(allDataUser,req.user.id);
                res.json({allFollower,allUser});
            })
            .catch(next);
    }
}

module.exports = new UserController;