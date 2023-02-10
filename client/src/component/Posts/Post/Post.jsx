//library of React
import React, { useState, useContext, memo, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import { hidePost, showPost, likePost,savePost, unLikePost, unSavePost } from "api"; 
import moment from 'moment'; 
//library of material ui
import { Card, CardActions, CardContent, CardMedia, Button, Typography,Avatar, MenuItem, Menu,Divider } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'; 
import AttachFileIcon from '@material-ui/icons/AttachFile'; 
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TurnedInIcon from '@material-ui/icons/TurnedIn'; 
//other
import { Data } from "App"; 
import useStyles, { ButtonHide } from "./styles";
import memories from 'images/memories.png' 
import { Box } from "@material-ui/core";

const Post = ({post,savePosts,id}) => {   
    const classes = useStyles();
    const data = useContext(Data);  
    const  idUser = data._id;  

    let navigate = useNavigate();  
    const avatar = post.nameUser.avatar;

    const [showMenuOfPost, setShowMenuOfPost] = useState(null);
    const [hearts, setHearts] = useState(post.like.length);
    const [isSave, setIsSave] = useState(savePosts.includes(post._id)); 
    const [showCopy, setShowCopy] = useState(false); 
    const [showHide, setShowHide] = useState(false);  
    const [scrollXImage, setScrollXImage] = useState({ 
        imageLength: post.img.length,
        currentIndex: 0,
        movement: 0
    }) 
    //Check in arryLike is empty and has userLogin in there or not to display heart in post (true/false)
    const [hearted,setHearted] = useState(()=> 
        (Object.keys(post.like).length !== 0) && (post.like.some(item =>  item._id === idUser) )  
    );     
    //Check Menu of post is open 
    const open = Boolean(showMenuOfPost);

    //Function to like or dislike post 
    const handleLike = (e) =>{
        e.preventDefault(); 
        setHearted((prev) => !prev); 
        if(hearted) { 
            setHearts(prev => prev - 1);
            unLikePost({ _id:post._id, idUser })
        } else { 
            setHearts(prev => prev + 1);
            likePost({ _id:post._id, idUser });
        } 
    }
    //Function to save post
    const handleSave = () =>{ 
        (!isSave)  
            ? savePost({ idPost:post._id, idUser }) 
            : unSavePost({ idPost:post._id, idUser }); 
        setIsSave(prev => !prev);
    }
    //Function to show or hide post
    const handleShowPost = () =>{
        (showHide)
            ? showPost({ idUser, idPost:post._id })
            :hidePost({ idUser, idPost:post._id });  
        setShowHide(prev => !prev);
        setShowMenuOfPost(false);
    } 
    //Function copy link url of post
    const handleCopy = () =>{
        navigator.clipboard.writeText(`http://localhost:5000/images/${post._id}`); 
        setShowCopy(true)
    } 

    const handleWheel = (e) => {
        if(post.img.length > 1){
            const delta = e.deltaY;
            console.log(delta);
            setScrollXImage(() => {
                if(scrollXImage !== undefined){ 
                    const maxLength = scrollXImage.imageLength - 1;
                    let nextMovement = scrollXImage.movement + delta;
                    if(nextMovement < 0)
                        nextMovement = 0;
                    if(nextMovement > maxLength*766)
                        nextMovement = maxLength*766;
                    return {
                        ...scrollXImage,
                        movement: nextMovement
                    }
                }
            })
        }
    } 
    console.log(scrollXImage)
    return (
        <>   
            <Card className={classes.card} style={{borderRadius: '15px'}}> 
                { showHide 
                    ? <div className={classes.hidePost}>
                        <Typography> Post is hide </Typography>
                        <div>
                            <ButtonHide onClick={handleShowPost}><VisibilityIcon/> Show post </ButtonHide>
                            <ButtonHide onClick={handleShowPost} style={{marginLeft:"10px"}}>Cancel</ButtonHide> 
                        </div>
                    </div>
                    : <><Box className={classes.boxCard}> 
                            <Box className={classes.scrollPost}>
                                { 
                                    post.img.map((image, index) => (
                                        <CardMedia 
                                            key={index}
                                            onMouseUp={(e)=>e.currentTarget.className = classes.media} 
                                            onMouseDown={(e)=>e.currentTarget.className = classes.hold} 
                                            className={classes.media} 
                                            image={`http://localhost:5000/images/${image}`}  
                                            title={post.title} 
                                        />
                                    )) 
                                } 
                            </Box>
                        </Box> 
                        <div className={classes.overlay}>
                            <Typography variant="h6" >{moment(post.createdAt).format('DD / MM / YYYY')}</Typography>
                            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                        </div> 
                        <div className={classes.overlay2} >
                            <Button  
                                size="small" id="demo-customized-button"  
                                aria-controls={open ? 'demo-customized-menu' : undefined} 
                                aria-haspopup="true" 
                                aria-expanded={open ? 'true' : undefined}  
                                disableElevation
                                onClick={(e)=>setShowMenuOfPost(e.currentTarget)}
                            >
                                <MoreHorizIcon fontSize="medium" style={{color:"white"}} />
                            </Button>   
                        </div>
                        
                        <Typography variant="body2" className={classes.details}>#{post.videoId}</Typography>
                        <CardContent style={{padding:0}}>
                            <div className={classes.grid}> 
                                {
                                    avatar === undefined
                                        ? <Avatar className={classes.marginLeft} alt="user" src={memories}  />
                                        : <Avatar className={classes.marginLeft} alt="user" src={`http://localhost:5000/images/${avatar}`} />
                                }
                                <Link to={`/user/${id}`} className={classes.marginLeft}>{post.nameUser.name}</Link>
                            </div>
                            <Typography className={classes.title} variant="h6" gutterBottom >{post.description}</Typography>
                        </CardContent>
                        <CardActions >
                            <Button size="small" color="primary" onClick={handleLike}>
                                { hearted
                                    ? <FavoriteIcon fontSize="small"/> 
                                    : <FavoriteBorderIcon fontSize="small"/>
                                } 
                                {hearts}
                            </Button>
                            <Typography className={classes.userLike}>{post.like.map(item => item.name === data.name ? "you" : item.name + ", ")}</Typography> 
                        </CardActions>
                    </>
                }
            </Card>  

            {/**----------------Menu Design post -----------*/} 
            <Menu id="demo-customized-menu" 
                MenuListProps={{ 'aria-labelledby': 'demo-customized-button'}}  
                anchorEl={showMenuOfPost} 
                open={open} 
                onClose={()=>setShowMenuOfPost(false)}  
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        margin:'0',
                        borderRadius:'15px', 
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
                        },
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
                <MenuItem onClick={()=>navigate(`/create/post/${id}`)} disableRipple> <EditIcon /> Edit </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleSave} disableRipple>
                    {isSave ?  <div style={{display:'flex'}}><TurnedInIcon />Un Save</div> : <div style={{display:'flex'}}><TurnedInNotIcon />Save</div>}
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleShowPost} disableRipple> <VisibilityOffIcon /> Hide post </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleCopy} disableRipple> 
                    <AttachFileIcon /> {showCopy ? "Have copy" : "Copy link"}
                </MenuItem>
            </Menu>  
        </>
    )
} 
export default memo(Post);