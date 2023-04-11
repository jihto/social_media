import Menu from "container/Menu/Menu";
import { Avatar, Card, Container, Typography,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions, Button } from "@material-ui/core";
import useStyles, { ButtonCustom, InuptIcon } from './styles'; 
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchChatBox } from "actions/chatBox"; 
import ContentMessage from "../../../component/ContentMessage/ContentMessage";
const ChatBoxPage = () => {
    const classes = useStyles();
    const [openDialog,setOpenDialog] = useState(false); 
    const [chat,setChat] = useState("");  
    // const [notification,setNotification] = useState();

    // const [fetchAgain,setFetchAgain] = useState(false);
    const dispatch = useDispatch(); 
    useEffect(()=>{
        dispatch(fetchChatBox());
    },[dispatch])

    const data = useSelector((state) => state.chatBox);  
    console.log(data);

    //When user click chat box will show out
    const handleShowContent = (chatBox) =>{
        setChat(chatBox);
    } 
    return (
    <>
        <Menu value={3}/> 
            <Container>
                <div className={classes.templateCol}> 
                        <Card className={classes.box}>
                            <InuptIcon />
                            <div style={{textAlign:"center"}}>
                                <ButtonCustom onClick={()=>setOpenDialog(prev => !prev)}>Create Group</ButtonCustom> 
                                <ButtonCustom onClick={()=>setOpenDialog(prev => !prev)}>Create Group</ButtonCustom>  
                            </div> 
                            {data.map(chatBox => (
                                    <Button 
                                        key={chatBox._id} 
                                        onClick={()=>handleShowContent(chatBox._id)} 
                                        className={`${classes.box} ${classes.buttonUsers}`}
                                    >
                                        <Avatar />
                                        <Typography variant="body1" >{chatBox.nameGroupChat}</Typography>
                                    </Button>
                                ))
                            } 
                        </Card> 
                        <Card className={classes.box}>  
                            { data.map(chatBox => ( 
                                    <div key={chatBox._id}> 
                                        <ContentMessage 
                                            content={chat === chatBox._id && chatBox } 
                                            idChat={chatBox._id}
                                            // setNotification={setNotification} 
                                        />  
                                    </div>
                            ))} 
                        </Card> 
                </div>
                <Dialog
                    open={openDialog} 
                    keepMounted
                    onClose={()=>setOpenDialog(prev => !prev)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>setOpenDialog(prev => !prev)}>Disagree</Button>
                    <Button onClick={()=>setOpenDialog(prev => !prev)}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </Container> 
        </>
    )
}

export default ChatBoxPage;