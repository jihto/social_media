 import ListFriend from 'component/ListFriends/ListFriend';
import Posts from '../../../component/Posts/Posts';
import { Container, Grid,Grow} from '@material-ui/core'; 
import Menu from 'container/Menu/Menu';  
import { useSelector,useDispatch } from 'react-redux';
import { getPosts } from 'actions/posts';
import { getInforUser } from "actions/inforUser";
import { getDataFollower } from "actions/user";
import { useContext, useState, useEffect} from 'react'; 
import { Data } from "App";  

function HomePage() {
  const [search,setSearch] = useState("");  
  const dispatch = useDispatch() 
  const idUser = useContext(Data)._id;  
  const dataPosts = useSelector((state) => state.posts.listPosts);  
  const  dataUser = useSelector(state => state.infoUser.user); 
  const savePosts = dataUser.savePosts;
  const dataFollower = useSelector((state) => state.user);   

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getInforUser(idUser));
  },[dispatch])   

  useEffect(()=>{ 
    dispatch(getDataFollower(search))
  },[dispatch,search]) 
  
    return (
        <>
          <Menu value={0}/> 
          <Grow in>
            <Container>
              <Grid container justifyContent='space-between' alignItems='stretch' spacing={4}>
                <Grid item xs={12} sm={8}>
                  <Posts data={dataPosts} savePosts={savePosts}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ListFriend data={dataFollower} search={search} setSearch={setSearch} />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </>
    )
}

export default HomePage;