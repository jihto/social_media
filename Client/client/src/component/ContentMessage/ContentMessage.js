import React, { memo } from 'react' 
import { Avatar, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import useStyles, { CustomButton, CustomInput } from '../../container/Page/ChatBoxPage/styles';
import { useEffect, useState } from "react";
import imageDefault from 'images/memories.png'
import imageBackground from 'images/background.jpg'
import SendIcon from '@material-ui/icons/Send';  
import { sendMessage } from "api";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from 'actions/messages';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:3000";
var socket;
const ContentMessage = ({content = [], idChat, setNotification}) => {  
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [typing,setTyping] = useState(false); 
    const [allNewMessages,setAllNewMessages] = useState([]);
   
    const idUser = JSON.parse(localStorage.getItem("token"))._id; 

    const handleSentMessage = (idChatBox) =>{ 
        const newMessages = sendMessage({ idChatBox,message }); 
        socket.emit("stop-typing",idChatBox);
        newMessages
            .then( result => socket.emit("new message",result.data))
            .catch(err => console.error(err));
        setMessage("");
    }
    //when user typing then set value typing of other users in group is true
    const handleTyping =(e,idChatBox)=>{
        setMessage(e.target.value); 
        socket.emit("typing",idChatBox);  
    } 
    //when user not focus input tags then set value typing for another users is false
    const hanldeNotFocus = (idChatBox) =>{ 
        socket.emit("stop-typing",idChatBox);
        setTyping(false);
    } 

    const dispatch = useDispatch();
    const dataMessages = useSelector(state => state.messages); 
    useEffect(()=>{ 
        socket = io(ENDPOINT);
        socket.on("connected",()=>{});
        socket.emit("setup",idUser);
        socket.on("typing", ()=> setTyping(true));
        socket.on("stop-typing", ()=> setTyping(false));
    },[])
    
    useEffect(()=>{ 
        dispatch(fetchMessages(idChat));
        socket.emit('join chat', content._id);  
    },[content,dispatch]); 

    useEffect(()=>{
        socket.on("message recieved", (newMessageRecieved) =>{   
            console.log(newMessageRecieved);
            if(idChat === newMessageRecieved.idChatBox){
                setAllNewMessages([...allNewMessages,newMessageRecieved]);  
                if(!content){
                    console.log("qua");
                    setNotification(false);
                }
            }
        })
    })
    return ( 
    <>
    { content &&
        <div style={{position:'sticky'}}>
            <Card className={`${classes.box} ${classes.headingTopChatBox}`} style={{ borderRadius: '15px 15px 0 0'}}>
                {
                    content.isGroupChat 
                    ? <Avatar src={imageBackground}/>
                    : content.members.map(member => (
                            member._id !== idUser 
                                && <Avatar key={member._id} src={member.avatar ? `http://localhost:5000/images/${member.avatar}` : imageDefault}/>
                        )) 
                }   
                <Typography variant="body1" >{content.nameGroupChat}</Typography> 
            </Card> 
            <Card >
                <CardContent > 
                    { dataMessages && dataMessages.map( dataMessage =>(
                            dataMessage.sender._id === idUser
                                ? <div className={classes.contentMessage} key={dataMessage._id}>
                                    <Card  className={`${classes.box} ${classes.message}`}>
                                        {dataMessage.message}
                                    </Card> 
                                    <Avatar className={classes.avatarMessage} src={`http://localhost:5000/images/${dataMessage.sender.avatar}`}/>
                                </div> 
                                : <div className={classes.contentMessageUsers} key={dataMessage._id}>
                                    <Avatar className={classes.avatarMessage} src={`http://localhost:5000/images/${dataMessage.sender.avatar}`}/>
                                    <Card  className={`${classes.box} ${classes.messageMember}`}>
                                        {dataMessage.message}
                                    </Card> 
                                </div> 
                        ))
                    }
                    {
                        allNewMessages && allNewMessages.map( dataMessage => (
                            <div className={classes.contentMessage} key={dataMessage._id}>
                                <Card  className={`${classes.box} ${ dataMessage.sender._id === idUser ? classes.message : classes.messageMember}`}>
                                    {dataMessage.message}
                                </Card> 
                                <Avatar className={classes.avatarMessage} src={`http://localhost:5000/images/${dataMessage.sender.avatar}`}/>
                            </div> 
                        ))
                    }
                    <div>
                        {typing && 
                            <div className={`${classes.box} ${classes.typing}`}>
                                <MoreHorizIcon fontSize="large" style={{display:"flex"}}/>
                            </div>
                        }
                    </div> 
                </CardContent>  
                <CardActions className={`${classes.box} ${classes.inputMessage}`}  style={{ borderRadius: ' 0 0 15px 15px',}}> 
                    <CustomInput onBlur={()=>hanldeNotFocus(content._id)} value={message} onChange={(e) => handleTyping(e,content._id)} id="filled-basic" label="Message..." variant="filled" />
                    <CustomButton onClick={()=>handleSentMessage(content._id)}><SendIcon/></CustomButton >
                </CardActions>
                
                </Card>
        </div>
    }
    </>  
  )
}

export default memo(ContentMessage);