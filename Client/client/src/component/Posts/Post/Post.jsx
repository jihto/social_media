//library of React
import React, { useState, useContext, memo, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import { hidePost, showPost, likePost,savePost, unLikePost, unSavePost } from "api"; 
import moment from 'moment'; 
//library of material ui
import { Card, CardActions, CardContent, CardMedia, Typography,Avatar, MenuItem, Menu,Divider } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'; 
import AttachFileIcon from '@material-ui/icons/AttachFile'; 
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TurnedInIcon from '@material-ui/icons/TurnedIn'; 

//

import { useTheme } from '@mui/material/styles'; 
import MobileStepper from '@mui/material/MobileStepper'; 
import SwipeableViews from 'react-swipeable-views';

//other
import { Data } from "App"; 
import useStyles, { ButtonHide } from "./styles";
import memories from 'images/memories.png' 
import { Box, Button } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
 
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

    //
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = post.img.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    }; 
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
                    : <> 
                        <Box sx={{ flexGrow: 1 }}>  
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                            >
                                {post.img.map((step, index) => (
                                    <div key={index}>
                                        {Math.abs(activeStep - index) <= 2 ? (
                                        <Box
                                            component="img"
                                            sx={{
                                                objectFit:"cover",
                                                height: 500,
                                                display: 'block', 
                                                overflow: 'hidden',
                                                width: '100%',
                                            }}
                                            src={`http://localhost:5000/images/${step}`} 
                                        />
                                        ) : null}
                                    </div>
                                ))} 
                            </SwipeableViews>
                            {
                                post.img.length > 1 && 
                                <MobileStepper
                                    className={classes.buttonImage}
                                    steps={maxSteps}
                                    position="static"
                                    sx={{background:'none'}}
                                    activeStep={activeStep}
                                    nextButton={
                                        <Button
                                            size="small"
                                            onClick={handleNext}
                                            disabled={activeStep === maxSteps - 1}
                                        >
                                            Next
                                            {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                            ) : (
                                            <KeyboardArrowRight />
                                            )}
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                            {theme.direction === 'rtl' ? (
                                            <KeyboardArrowRight />
                                            ) : (
                                            <KeyboardArrowLeft />
                                            )}
                                            Back
                                        </Button>
                                    }
                                />
                            }
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