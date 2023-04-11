const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const authUser = require('./auth.routes');
const adminRouter = require('./adminRouter');
const messageRouter = require('./messageRouter');
const chatBoxRouter = require('./chatBoxRouter');
const noteRouter = require("./noteRouter");
const { authJwt, authAdmin } = require('../app/midddleware'); 
 
function route(app){
    app.use('/user', authJwt, userRouter); 
    app.use('/post', authJwt, postRouter);
    app.use('/admin', authJwt, authAdmin, adminRouter);
    app.use('/authUser', authUser);
    app.use('/chatBox', authJwt, chatBoxRouter);
    app.use('/message', authJwt, messageRouter);
    app.use('/note', authJwt, noteRouter); 
}

module.exports = route;