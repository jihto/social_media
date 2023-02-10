const mongoose = require('mongoose');
const db = require('C:\\New folder\\D\\Project1\\Sever\\app\\models');
const Role = db.role;
async function connect(){
    try{
        await mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://127.0.0.1:27017/social_network_dev',{
                useNewUrlParser: true,
                useUnifiedTopology:true
        });
        console.log('Connect database Successfully');
        // initial();
    }
    catch (error) {
      console.log(error)
        console.log('ERROR!! UnSuccessfully');
    }
}


function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'moderator' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    })
};

module.exports = { connect }