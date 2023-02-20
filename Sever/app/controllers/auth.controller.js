const config = process.env;
const { User, Information } = require("../models"); 
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var randtoken = require('rand-token'); 
class authUser{ 
  register = async (req,res,next) => {
      try { 
          const { name, email, password } = req.body;
          console.log(name, email, password);
          // Validate user input
          const oldUser = await User.findOne({ email });
          if (oldUser)
              return res.status(400).json({message:"User Already Exist. Please Login"});
          //Encrypt user password
          const encryptedPassword = await bcrypt.hash(password, 10); 
          // Create user in our database
          const newUser = await User.create({
              name:name,
              email: email.toLowerCase(), 
              password: encryptedPassword,
          }); 
          const token = jwt.sign({id:newUser.id, email},process.env.ACCESS_TOKEN_SECRET,
            {
              algorithm: 'HS256',
              expiresIn: process.env.ACCESS_TOKEN_LIFE,
            }); 
            
            const createInfo  = await Information.create({ user: newUser._id }); 
            await User.findOneAndUpdate({ _id:newUser._id},{ $set: {information: createInfo._id, token, refreshToken:token}})
          res.status(200).json({message:"Create new user successful"});
      } catch (err) {
          console.log(err);
      }
  }
  login = async (req,res,next) => {
      try { 
          const { email, password } = req.body; 
          // check the user email and password 
          const user = await User.findOne({ email }) // .populate("roles", "-__v");

          if(!user)
              return  res.status(400).json({message: 'User is not register'});   
          const isPassword = bcrypt.compare(password, user.password);
          if(!isPassword)
              return res.status(400).json({message: 'password is not correct'}); 
          if(user && isPassword) {
            // Create token
            const token = jwt.sign({id:user.id, email},process.env.ACCESS_TOKEN_SECRET,
              {
                algorithm: 'HS256',
                expiresIn: process.env.ACCESS_TOKEN_LIFE,
              }); 
            // jwt.randtoken() 
            //update token in database when user log in
            if (!token) 
              return res.status(400).json({message:'fail Log in, please try again '});
            else
              await User.findByIdAndUpdate(user._id,{ $set: { token }} ); 
            
              let refreshToken = token; 
            if (!user.refreshToken){ 
              // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
                await User.findByIdAndUpdate(user._id,{ $set: {refreshToken}} );
            } else {
                // Nếu user này đã có refresh token thì lấy refresh token đó từ database
                refreshToken = user.refreshToken;
            }
              
            // var authorities = [];
            // for (let i = 0; i < user.roles.length; i++) {
            //     authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            // }  
            const data = {
              _id:user.id, 
              name:user.name, 
              email:user.email, 
              avatar:user.avatar,
              savePosts:user.savePosts, 
              token,
              refreshToken,
              storyMessage:user.storyMessage, 
            }
            return res.status(200).json(data);
          }
          return res.status(400).json({message: "Something is wrong"});
      } catch (err) { 
          return res.status(500).json({message:err.message});
      }
  }

  Token = async(req,res,next) => {
    try{
      const {refreshToken,id, email} = req.body; 
      const infoUser = await User.findOne({_id:id}); 
      if(infoUser && refreshToken){
        const token = jwt.sign({ id, email},process.env.ACCESS_TOKEN_SECRET,
          {
            algorithm: 'HS256',
            expiresIn: process.env.REFRESH_TOKEN_LIFE,
          }); 
          await User.findByIdAndUpdate({_id:id},{ $set: { token: token,refreshToken: token }});
          const data = {
            token,
            refreshToken:token
          } 
          res.status(200).json(data); 
      }
    } catch(err) {
        return res.status(404).json({mesage: err})
    }
  } 
  changePassword = async (req,res,next) => {
    try {
      const _id = req.user._id;
      const { oldPass, newPass } = req.body;
      const { password, ...other } = await User.find({ _id });
      const checkPassword = await bcrypt.compare(oldPass, password);
      if(checkPassword){
        const encryptedPassword = await bcrypt.hash(newPass, 10); 
        await User.find({ _id }, {$set: { password: encryptedPassword }});
        res.status(200).json({message: "Change Password successful"});
      }else{
        res.status(500).json({message: "Password isn't correct"})
      }
    } catch (error) {
      
    }
    
  }
  signup(req, res){
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (req.body.roles) {
        Role.find({name: { $in: req.body.roles }},
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
};
}

module.exports = new authUser;