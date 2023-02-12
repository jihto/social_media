//React
import { useNavigate, useParams } from "react-router-dom"; 
import { useEffect, useState, useRef } from 'react';
//React-Redux
import { followUser, unFollowUser } from 'api';
import { getInforUser } from 'actions/inforUser';  
import { getAllPostsUser, getDataSavePost } from "actions/posts";
import { getAllNotesUser } from "actions/note";
import {useDispatch, useSelector} from 'react-redux'; 
//Material Ui  
import RemoveIcon from '@material-ui/icons/Remove'; 
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'; 
import { Container, Box, Avatar, Typography, Tab, Card, Grid, Tabs, Fab, Zoom, Tooltip, Divider, Button, IconButton  } from '@material-ui/core'; 
//Other 
import useStyles from './styles';
import memories from 'images/memories.png';
import MainMenu from "container/Menu/Menu"; 
import PostsOfUser from '../../../component/PostsOfUser/PostsOfUser';
import NoteList from "../../../component/NotesList/NoteList"; 
import { fabs } from 'constants';
import { isEmpty } from 'util/CheckObject';
import { Alert } from "@mui/material";
import { CustomButton } from "constants";

function UserPage() {
    const classes = useStyles();
    let navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    //Fetch data user 
    const dataUser = useSelector(state => state.infoUser.user);   
    const dataPostsOfUser = useSelector((state) => state.posts.postsUser); 
    const dataNotesOfUser = useSelector(state => state.note.notesUser);
    const savePosts = useSelector((state) => state.posts.savePosts).savePosts; 
    const result = useSelector(state => state.posts.result);
    const message = useSelector(state => state.posts.message); 
    const postdRef = useRef();  
    // id user from params
    const { id } = useParams(); 
    const idUserLogin = JSON.parse(localStorage.getItem("token"))._id;

    const isUser = idUserLogin === id;
    const [showCreateNote, setShowCreateNote] = useState(false);
    //value tabs
    const [value,setValue] = useState(0);  
    const [follow, setFollow] = useState(false); 

    const [showMessage, setShowMessage] = useState(false);
    
    //Number following 
    let countFollow = 0;
    let countFollowing = 0; 
    let isFollow = false;
    if(!isEmpty(dataUser)){
        countFollow = dataUser.follow.length;
        countFollowing = dataUser.following.length;
        // check user it follow or not 
        isFollow = dataUser.following.includes(idUserLogin);   
    }  

    const handleShowMessage = () => {
        setShowMessage(true);
        setTimeout(()=>{
            setShowMessage(false);
        },3000)
    }

    const handleChangeSetting = () =>{
        let path = '/user/setting';
        navigate(path,{ state: dataUser.avatar});
    }
    // Handle Follow and unfollow
    const handleFollow = () =>{ 
        const data = {'userId': idUserLogin,'followerId':dataUser.id}; 
        follow
            ? unFollowUser(data) 
            : followUser(data);
        setFollow(prev => !prev); 
    }  
    
    const handleTabClick  =(e,value) => {
        setValue(value)
    } 

    const handleCreateNew = (index) =>{
        if(index === 0)
            postdRef.current.showCreatePost();
        else if(index === 1)
            setShowCreateNote(prev => !prev); 
        else if(index === 2)
            console.log("2222")
    }  

    useEffect(() => {
        setFollow(isFollow);
    },[isFollow]);

    useEffect(() => { 
        // if(!isUser)
            dispatch(getInforUser(id));  
        if(value === 0)
            dispatch(getAllPostsUser(id)); 
        else if(value === 1)
            dispatch(getAllNotesUser(id));         
        else if(value === 2)
            dispatch(getDataSavePost(id));
    },[id, value]);
    return (
        <>
            <MainMenu value={1}/> 
            <Container >
                <Card className={classes.flex}>  
                    <Tooltip title="Avatar settings" className={classes.avatar}>
                        <IconButton onClick={()=>postdRef.current.showDialogPost({state:true,data:{img:[dataUser.avatar === undefined ? memories : dataUser.avatar ]}})}>
                            <Avatar style={{width:'60px',height:'60px'}} src={dataUser.avatar && `http://localhost:5000/images/${dataUser.avatar}`} /> 
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h5" className={classes.name} style={{ flexGrow: 1}}>{dataUser.name }</Typography> 
                    <CustomButton 
                        color="primary"
                        variant="outlined" 
                        className={classes.Inupt} 
                        onClick={()=> isUser ? handleChangeSetting() : handleFollow()} 
                    >
                        { isUser
                            ? "Setting" 
                            : follow ? "UnFollow" : "Follow" 
                        }
                    </CustomButton>
                </Card>

                {/**------------------------About User ---------------------------------*/}
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={4}>
                    <Grid item xs={12} sm={3}>
                        <Card className={classes.Box} style={{marginTop:"5%"}}> 
                            <CustomButton className={`${classes.Inupt}`} variant="outlined" color="primary" onClick={()=>{navigate("/home")}}><KeyboardReturnIcon/>Back</CustomButton> 
                            <Divider style={{margin:"0 10%"}}/>
                            <div className={classes.details}>
                                <Typography variant="h5">About: </Typography>
                            </div> 
                            <Typography variant="body2"  className={classes.about} mt={2}> {dataUser.storyMessage}</Typography>
                            <Divider style={{margin:"0 10%"}}/>
                            <div className={classes.infor} >
                                <div className={classes.about}>
                                    <Typography variant="body1" >Following</Typography>
                                    <Button >{countFollow}</Button> 
                                </div>
                                <div className={classes.about}>
                                    <Typography variant="body1" >Follower</Typography>
                                    <Typography variant="body1" >{countFollowing}</Typography> 
                                </div>
                            </div>
                        </Card>
                    </Grid>
                    {/** ------------------------------------------------------- */}

                    <Grid item xs={12} sm={9} >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs variant="fullWidth" 
                                textColor="primary" 
                                indicatorColor="primary" 
                                aria-label="basic tabs example" 
                                value={value}  
                                onChange={handleTabClick} 
                            >
                                <Tab value={0} label="Post" style={{color: 'black'}}/>
                                <Tab value={1} label="Story" style={{color: 'black'}}/>
                                <Tab value={2} label="Save" style={{color: 'black'}}/>
                            </Tabs> 
                            <hr/>
                            <TabPanel value = {value} index = {0}  >
                                <PostsOfUser 
                                    value = {isUser ? "IsUser" : "NotUser"} 
                                    postsUser = {dataPostsOfUser} 
                                    handleShowMessage = {handleShowMessage} 
                                    ref = {postdRef}
                                />
                            </TabPanel> 
                            <TabPanel value = {value} index = {1} > 
                                <NoteList notesUser = {dataNotesOfUser} showCreateNote={showCreateNote} isUser={isUser}/> 
                            </TabPanel> 
                            <TabPanel value = {value} index = {2} > 
                                <PostsOfUser value={"SavePost"} postsUser={savePosts} isUser={isUser} ref ={postdRef}/>
                            </TabPanel> 
                        </Box>
                        
                        {/* Show button create in the bottom */}
                        {isUser && (
                            fabs.map((fab, index) => (
                                <Zoom key={fab.color} in={value === index } unmountOnExit className={classes.buttonCreate}>
                                    <Container>
                                        <Fab sx={fab.sx} 
                                            aria-label={fab.label} 
                                            color={fab.color}
                                            onClick={()=>handleCreateNew(index)}
                                        >
                                            {!showCreateNote ? fab.icon : <RemoveIcon/>}
                                        </Fab>  
                                    </Container>
                                </Zoom>
                        )))}
                        {/*---------------------------------------- */}
                    </Grid>
                </Grid> 
            </Container>
            <div className={classes.messageAfterHandle}>
                {
                showMessage 
                    ? result
                        ? <Alert variant="outlined" severity="success">{message}</Alert>
                        : <Alert variant="outlined" severity="error">{message}</Alert>
                    : null
                }
            </div>    
        </>
    )
}

function TabPanel(props){
    const {children, value, index} = props;
    return ( 
        <> { value === index && ( <>{children}</> ) } </>
    ) 
} 
export default UserPage;