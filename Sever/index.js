const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');  
const dotenv = require('dotenv');
const db = require('./config/db')

const route = require('./routes'); 
const { json } = require('body-parser');
db.connect() // Connect mongoosef
dotenv.config();
const app = express();
const port = 5000;
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//add url image in public/image
app.use(express.static(path.join(__dirname,'public')));
app.use('/images', express.static('images'));

//use data from body form 
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
// 
app.use(methodOverride('_method'))
app.use(express.json());
 
app.use(cors());
//Router
route(app);   
 
app.set('views',path.join(__dirname, 'resources/views'))
const server = app.listen(port,()=>{
    console.log(`Listening on port http://localhost:${port}`);
}) 

//socket io
const io = require('socket.io')(server,{
  pingTimeout: 60000,
  cors: {
    origin:'http://localhost:3000',
  },
})

io.on('connection',(socket) => {
  console.log("connected to socket.io");

  socket.on("setup",(idUser) => {
    socket.join(idUser); 
    socket.emit("connected"); 
  });

  socket.on('join chat',(room) => {
    socket.join(room); 
  })
  socket.on('typing',(room) => {  
    socket.in(room).emit("typing");
  })
  socket.on('stop-typing',(room) => { 
    socket.in(room).emit("stop-typing");
  })
  
  socket.on("new message",(newMessageRecieved) => {
    const idChatBox = newMessageRecieved.idChatBox; 
    io.in(idChatBox).emit("message recieved",newMessageRecieved);
  })
  
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(idUser);
  });
});