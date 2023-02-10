const jwt = require("jsonwebtoken"); 
const config = process.env;

const authenToken = (req, res, next) => { 
  const authorizationHeader = req.headers.authorization.split(" ")[1]; 
  if(!authorizationHeader) 
    res.status(401).send("Unauthorized request"); 
  try{
    const decoded = jwt.verify(authorizationHeader, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;   
    return next();
  }catch(error){
    return res.status(401).send(`Invalid Token ${error.message}`);
  }
};

module.exports = authenToken;