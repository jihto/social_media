const { ChatBox, Message } = require('../models');

class MessageController{
    fetchMessage = async(req,res,next) => { 
        try {
            const messages = await Message.find({ idChatBox: req.params.idChatBox})
                .populate({
                    path:"sender",
                    select:"name avatar"
                }) 
            res.status(200).json(messages);
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
        
    }
    sending = async(req,res,next) => {
        const { idChatBox, message } = req.body;
        try {
            const data = {
                sender: req.user.id,
                idChatBox,
                message
            }
            let sendMessage = await Message.create(data);
            sendMessage = await sendMessage.populate({
                path:"sender",
                select:"name avatar"
            }) 
            const idMessage = sendMessage._id.toString();
            await ChatBox.findByIdAndUpdate({ _id:idChatBox },{$push : {content : idMessage}})
            res.status(200).json(sendMessage);
        } catch (error) { 
            res.status(400).json({"message": `${error}`}); 
        }
    }
    change = async(req,res,next) => {

    }
}


module.exports = new MessageController;