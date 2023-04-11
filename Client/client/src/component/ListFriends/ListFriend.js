import React, { memo, useState } from "react";
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
    const [moveIconm, setMoveIcon] = useState(0);
     return (
        <>  
            <Card  color='inherit' className={classes.connected}>
                <Typography variant="h6" className={classes.textLocation} gutterBottom >Connected: </Typography> 
                <Connected/> 
            </Card>

            <Card position='static' color='inherit' className={`${classes.connected}`}>
                <div className={classes.find}>
                    <TextField 
                        value={search} 
                        onChange={(e) => {setSearch(e.target.value); setMoveIcon(prev => prev < 10 ? prev + 1 : 0)}} 
                        onBlur={()=>setMoveIcon(0)}
                        id="outlined-basic" 
                        variant="outlined"  
                        className={classes.search} 
                        label="Search"
                    />
                    <SearchIcon fontSize='large' className={`${classes.iconFind}`} style={{transform: `rotate(0.${moveIconm}turn)`}}/>
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