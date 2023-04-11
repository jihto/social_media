import React, { useState } from "react";
import { Card,Avatar,Typography,Button  } from '@material-ui/core';
import useStyles from './styles';
import memories from 'images/memories.png' 
import { useNavigate } from "react-router-dom";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { followUser, unFollowUser } from "api";
import { memo } from "react";


const NewFriend = ({user, isFollower, showfull }) =>{  
    let navigate = useNavigate();
    const classes = useStyles(); 
    const [addFriend,setAddFriend] = useState(isFollower);
    const handleChange = () =>{
        let path = `/user/${user.id}`;
        navigate(path);
    } 
    const userId = JSON.parse(localStorage.getItem("token"))._id; 
    const handleFollow = (e) =>{
        const data = {'userId':userId,'followerId':user.id};
        (addFriend)
            ? unFollowUser(data)
            : followUser(data)
        setAddFriend(prev=>!prev)
    } 
    return (  
        <Card className={classes.card} position='static' color='inherit'>
            <Button variant='contained' onClick={handleChange} className={classes.redirectUserUi}> 
                { !user.avatar 
                    ? <Avatar alt="avatar" src={memories} className={classes.avatar} />
                    : <Avatar alt="avatar" src={`http://localhost:5000/images/${user.avatar}`} className={classes.avatar} />
                }
                <Typography className={classes.title} variant="h6" gutterBottom >{user.name}</Typography>
            </Button>
            { showfull && 
                <div >
                    <Typography className={classes.description} variant="body2">Description: abc</Typography>
                    <Typography className={classes.description} variant="body2">Email: abc</Typography>
                    <Typography className={classes.description} variant="body2">Time: abc</Typography> 
                </div>
            }
            {
                addFriend
                    ? <Button variant="text" className={classes.buttonIcon} onClick={handleFollow}><HowToRegIcon/></Button>
                    : <Button variant="text" className={classes.buttonIcon} onClick={handleFollow}><GroupAddIcon /></Button>
            }

            
        </Card >   
    )
}

export default memo(NewFriend);