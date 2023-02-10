const { User } = require('../../models');
const { mutipleMongooseToObject,mongooseToObject } = require('../../../util/mongoose');
const authAdmin = (req, res, next)=>{
    try{
        const roles = req.user.roles; 
        roles.map((role)=>{
            if(role.name === 'admin'){  
                return next(); 
            }
        }) 
    }
    catch(err){
        res.status(403).json("Not allow");
    }}

module.exports = authAdmin;