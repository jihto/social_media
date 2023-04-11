const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
const { remove } = require('../models/ChatBoxModel');
const { ChatBox, User } = require('../models');

class ChatBoxController{
    fetchChatBox = async (req,res,next) =>{
        await ChatBox.find({ memebers : { $elemMatch: { $eq : req.user._id } } })
            .populate({ path:"adminGroup", select:"name avatar" })
            .populate({ path:"members", select:"name avatar" })  
                .then( async(result) =>{
                    result = await User.populate(result,{path:"content.sender",select:"name avatar"})
                    return res.status(200).json(result)
                })
                .catch(next);
    }
    createSingleBox = async (req,res,next) => {   
        const data = { 
            isGroupChat: false,
            members: [req.body.member,req.user.id],
            adminGroup:req.user.id
        }  
        if(!req.body.member){
            return res.status(400).json({"message":"error when create chat Box"})
        }
        try {
            await ChatBox.create(data)
                    .then(result => { 
                        res.status(200).json(result)
                    })
                    .catch(next)
        } catch (error) {
            return res.status(400).json({"message":"error when create chat Box"})
        }
    }
    createGroupBox = async (req,res,next) => {  
        if(req.body.members.length <= 2)
            return res.status(400).json({"message":"members need greater than 2"});
        try {
            const data = { 
                isGroupChat: true,
                members: JSON.parse(req.body.members),
                adminGroup: req.user.id
            }  
             await ChatBox.create(data)
                .then(result =>  {
                    res.status(200).json(result)
                })
                .catch(next)
            const dataGroupChat = await ChatBox.find({ _id: groupChat._id})
                        .populate({
                            path:'members',
                            select: 'name avatar'
                        })
                        .populate({
                            path:'adminGroup',
                            select: 'name avatar'
                        })
                        res.status(200).json(dataGroupChat);

        } catch (error) {
            return res.status(400).json({"message":"error when create chat Box"})
        }
    }
    reName = async (req,res,next) => { 
        const { newName,chatId } = req.body;
        try {
            await ChatBox.findOneAndUpdate({ _id: chatId },{ $set: { nameGroupChat: newName }})
                    .then( result => res.status(200).json({"message" : "Rename successful"}) )
                    .catch(next)
        } catch (error) {
            return res.status(400).json({"message":`when rename chat Box : ${error}`});
        } 
    }
    addToGroup = async (req,res,next) => { 
        const { member,chatId } = req.body;
        try {
            const addMember = await ChatBox.findByIdAndUpdate({ _id: chatId},{$push : { members : member }},{new: true}); 
            if(addMember)
                res.status(200).json(addMember);
            else
                res.status(400).json({message:"Chat box not found"}); 
        } catch (error) {
            return res.status(400).json({"message":`Error add member to chat Box : ${error}`})
        } 
    }
    removeFromGroup = async (req,res,next) => {  
        const { member,chatId } = req.body;
        try {
            const removeMember = await ChatBox.findByIdAndUpdate({ _id: chatId},{$pull : { members : member }}); 
            if(removeMember)
                res.status(200).json(removeMember);
            else
                res.status(400).json({message:"Chat box not found"});
        } catch (error) {
            return res.status(400).json({"message":`Error add member to chat Box : ${error}`})
        } 
    }
}
module.exports = new ChatBoxController;