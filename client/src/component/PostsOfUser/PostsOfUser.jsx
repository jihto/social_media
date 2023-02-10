//Library form material ui 
import Grid from '@mui/material/Grid';
import { forwardRef, memo } from 'react'; 
//Other  
import PostOfUser from './PostOfUser/PostOfUser';

const PostsOfUser = ({ postsUser, handleShowMessage, value,isUser }, ref) => { 
    return ( 
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            <PostOfUser handleShowMessage={handleShowMessage} value={value} isUser={isUser} ref={ref}/>
            {  
                postsUser && postsUser.map(postUser => ( 
                    <Grid item xs={4} key={postUser._id}>
                        <PostOfUser postUser={postUser} handleShowMessage={handleShowMessage} value={value} isUser={isUser} ref={ref} />
                    </Grid>
                ))  
            }   
        </Grid>      
    )
}
export default memo(forwardRef(PostsOfUser));