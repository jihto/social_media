import React, { memo } from "react";
import { CircularProgress,Card,Typography,TextField  } from '@material-ui/core';
import useStyles from './styles';
import Friend from './Friend/Friend'; 
import { useContext } from 'react'; 
import SearchIcon from '@material-ui/icons/Search';
import Connected from "../Connected/Connected";  
import FullListFriends from "./FullListFriends";
import { Data } from "App";  
const ListFriend = ({search,data,setSearch}) => {
    const classes = useStyles();    
    const idUserLogin = useContext(Data)._id;
     return (
        <>  
            <Card  color='inherit' className={classes.connected}>
                <Typography variant="h6" className={classes.textLocation} gutterBottom >Connected: </Typography> 
                <Connected/> 
            </Card>

            <Card position='static' color='inherit' className={`${classes.connected}`}>
                <div className={classes.find}>
                    <TextField value={search} onChange={(e) => setSearch(e.target.value)} id="filled-basic" className={classes.search} label="Search"  variant="standard"/>
                    <SearchIcon fontSize='large' className={classes.iconFind}/>
                </div>
                <div className={classes.heading}>
                    <Typography variant="h6" gutterBottom >Add fiends</Typography>
                    <FullListFriends allData={data} />
                </div>
                { !Array.isArray(data)
                    ? <CircularProgress /> 
                    : <> {
                            data.map((user,index) =>( 
                                <div key={user._id}>
                                    { (index < 5 )  
                                        ? <Friend  
                                            isFollower={user.following.includes(idUserLogin)}
                                            user={user} 
                                        />
                                        : null
                                    } 
                                </div>  
                            )) 
                        } 
                    </> 
                }    
            </Card > 
        </>
    )
}

export default memo(ListFriend);