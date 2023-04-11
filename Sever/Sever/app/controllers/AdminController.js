const { User, Post } = require('../models');
const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose'); 

class AdminController{
    main(req,res,next){ 
        Promise.all([
            Post.find(),
                // .populate({
                //     path:'nameUser',
                //     select: 'name message avatar'
                // }),
            User.find({}) 
        ])
        .then(([posts,users]) => {
                const data =[posts ,users]; 
                res.json(data);
            })
            .catch(next);
    }
}
module.exports = new AdminController;