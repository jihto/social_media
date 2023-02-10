//Library form material ui and styles
import { Box, CardMedia, CardActions, Card, Grid, CardContent, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Typography} from '@material-ui/core';
import { Menu, MenuItem,Button } from '@mui/material';   
import CreateIcon from '@material-ui/icons/Create'; 
import DeleteIcon from '@material-ui/icons/Delete'; 
import KeyboardCapslockIcon from '@material-ui/icons/KeyboardCapslock';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';  
import CollectionsIcon from '@material-ui/icons/Collections';
import ListIcon from '@material-ui/icons/List';
import useStyles from './styles'; 
//Other 
import { Data } from "App"; 
import { savePost, unSavePost } from "api"; 
import { useState,useCallback, forwardRef, useImperativeHandle, useContext, memo} from 'react'; 
import defaultImage from 'images/add_image.png'; 
import FormCreatePost from 'component/FormCreatePost/FormCreatePost';
import { TransitionZoom, TransitionSlide } from 'constants';
import { useDispatch } from 'react-redux';
import { dataDeletePost } from 'actions/posts';

const PostOfUser = ({ postUser, handleShowMessage, value, isUser }, ref) => {
    const classes = useStyles();  
    const idUser = useContext(Data)._id;
    // pass the fuction to UserPage 
    const dispatch = useDispatch();
    const [showPost, setShowPost] = useState({state:false, data:{img:defaultImage}}); 
    const [editPost,setEditPost] = useState(false); //Check edit post in FormCreatePost or not
    const [showDialogDelete,setShowDialogDelete] = useState({ state: false, data: { img: defaultImage }} ); 
    const [isSave, setIsSave] = useState(true); 

    const [showMenuOfPost, setShowMenuOfPost] = useState(null);
    const open = Boolean(showMenuOfPost); 
    useImperativeHandle(ref, () => ({ 
            showCreatePost(){ 
                setShowPost({state:true,data:false});
                setEditPost(true);
            },
            showDialogPost(data){
                setShowPost(data);
            }
    }));    
    // handle when click button delete post
    const handleTrash = ()=>{
        setShowDialogDelete({...showDialogDelete,state:false});
        dispatch(dataDeletePost(showDialogDelete.data.idPost))
        handleShowMessage();
    }
    //handle Save or unsave post 
    const handleSave = () =>{ 
        (!isSave)  
            ? savePost({ idPost:postUser._id, idUser }) 
            : unSavePost({ idPost:postUser._id, idUser }); 
        setIsSave(prev => !prev);
    } 
    // Change url 
    const handleChangePost = (postUser,isUser) =>{ 
        setShowPost({
            state:true,
            data:{
                img:postUser.img,
                description: postUser.description,
                createdAt:postUser.createdAt,
                _id:postUser._id
            }
        })
        isUser && setEditPost(true);
    } 
    const handleClosePost = useCallback(() =>{
        setShowPost({...showPost,state:false});
        setEditPost(false);
        setShowMenuOfPost(null);
    },[showPost])

    const [showDescription, setShowDescription] = useState(false);
    // console.log("Render POST..."); 
    const handleOnMouseMove = async() => {
        setShowDescription(true);
    }  
    const handleOnMouseLeave = async() => {
        setShowDescription(false);
    }
    return (
    <>{ postUser &&
        <Box> 
            {/**---Post show in ui user ----*/}
            <Card 
                className={classes.cardPost} 
                onMouseMove={handleOnMouseMove}
                onMouseLeave={handleOnMouseLeave}
            >  
                {
                    postUser.img.length > 1
                        ?<CardContent className={classes.multipleImage}>
                            <CollectionsIcon/>
                        </CardContent>
                        :<></>    
                }
                <Box className={`${classes.description} ${showDescription ? classes.showDes : classes.hideDes}`}>
                    <Typography variant='h6'>{postUser.description}</Typography>
                </Box>
                <CardMedia className={classes.mediaPost} image={`http://localhost:5000/images/${postUser.img[0]}`} onClick={()=>setShowPost({state:true,data:{img:postUser.img,description: postUser.description,createdAt:postUser.createdAt}})}/>    
                <CardActions className={classes.cardActions}>   
                {
                    value === "IsUser"
                        ? <Button id="demo-customized-button"  
                            aria-controls={open ? 'demo-customized-menu' : undefined} 
                            aria-haspopup="true" 
                            aria-expanded={open ? 'true' : undefined}  
                            onClick={(e)=>setShowMenuOfPost(e.currentTarget)}
                            variant="text" 
                            sx={{color:'white'}}
                        >  <ListIcon/> </Button>
                        : value === "SavePost" 
                            ? <Button variant="text" sx={{color:'white'}} onClick={()=> {isUser && handleSave()}}>{ isSave ? <TurnedInIcon /> :isUser &&  <TurnedInNotIcon />}</Button>
                            : <Button variant="text" sx={{color:'white'}} onClick={()=>handleChangePost(postUser, false)}> <KeyboardCapslockIcon/> </Button> 
                }
                </CardActions> 
            </Card> 
        </Box>
    }
    {/* Show description post */}
    <Dialog fullWidth
            open={showPost.state}
            maxWidth="lg"
            transitionDuration={{ enter: 500, exit: 500 }}
            PaperProps ={{ style: { backgroundColor: '#bdc3c7', boxShadow: 'none', borderRadius: '15px', height:"100%"}, }} 
            onClose={handleClosePost}
            TransitionComponent={TransitionZoom} 
        > 
            <DialogContent > 
                {
                    editPost  
                        ? (<FormCreatePost 
                                data = {showPost.data} 
                                create={true} 
                                onClosePost={handleClosePost}  
                                handleShowMessage={handleShowMessage}
                            />)
                        : (<FormCreatePost 
                                data ={showPost.data} 
                                create={false}  
                                handleShowMessage={handleShowMessage}
                            />) 
                }
            </DialogContent>
        </Dialog>
        {/*---------------------------------------- */}

        {/*Show a dialog delete post*/}
        <Dialog PaperProps = {{ style:{ backgroundColor: '#bdc3c7', boxShadow: 'none',  borderRadius: ' 15px', margin: '2%'},}} 
            transitionDuration={{ enter: 500, exit: 500 }}
            open={showDialogDelete.state} 
            TransitionComponent={TransitionSlide}  
            onClose={()=>setShowDialogDelete({...showDialogDelete,state:false})} 
        >
            <DialogTitle id="alert-dialog-title" >
                {"Do you want delete post?"} 
            </DialogTitle>
            <DialogContent > 
                <Grid container justifyContent='space-between' alignItems='stretch'>
                    <Card className={classes.card}>
                        <CardMedia className={classes.mediaPost} image={`http://localhost:5000/images/${showDialogDelete.data.img[0]}`}/>
                    </Card>   
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTrash}  variant="outlined" color="primary" >Delete</Button>
                <Button onClick={()=>setShowDialogDelete({...showDialogDelete,state:false})}  variant="outlined" color="primary" autoFocus>Cancel</Button>
            </DialogActions>
        </Dialog>
        {/** */}
        <Menu id="demo-customized-menu" 
            MenuListProps={{ 'aria-labelledby': 'demo-customized-button'}}  
            anchorEl={showMenuOfPost} 
            open={open} 
            onClose={()=>setShowMenuOfPost(false)} 
            disableEnforceFocus
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "box-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    margin:'0',
                    borderRadius:'15px',  
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 25,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0
                    }
                }
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >   
            <MenuItem disableRipple onClick={()=>handleChangePost(postUser,true)}><CreateIcon/> Update </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem disableRipple onClick={()=>setShowDialogDelete({state:true,data:{img:postUser.img,idPost:postUser._id}})}> <DeleteIcon/>Delete </MenuItem> 
        </Menu>   
    </>
    )
}

export default  memo(forwardRef(PostOfUser));