import Post from './Post/Post'; 
import { Grid, CircularProgress, } from '@material-ui/core';
import { useContext, memo } from 'react'; 
import { Data } from "App";  
const Posts = ({data, savePosts}) => { 
    const idUser = useContext(Data)._id;  
    return ( 
        !data || !savePosts ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>  
                    {data.map((post) =>(  
                        !post.hide.includes(idUser) && <Grid  item xs={12} sm={12} key={post._id}> 
                            <Post post={post} savePosts={savePosts} id={post.nameUser.id} />
                        </Grid>
                    ))}
            </Grid>
        )
    )
}

export default memo(Posts);