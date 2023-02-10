const { UserModel } = require("../../models");
const jwt = require("jsonwebtoken");

const verifyRefreshToken  = (refreshToken)=>{ 
    return new Promise((resolve, reject) =>{
        UserModel.findOne({refreshToken : refreshToken}, (err,data) =>{
            if(!data)
                return reject({ error: true, message: "Invalid refresh token"}); 
            try{
                const tokenAccept = jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET);
                console.log(tokenAccept);
                return resolve({tokenAccept, error: false, message: "Valid refeshToken"})
            }
            catch(err){
                console.log(err);
                return reject({ error: true, message:`Invalid refresh token`}); 
            } 
        })
    })
} 

module.exports = verifyRefreshToken;