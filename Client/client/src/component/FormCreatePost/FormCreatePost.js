//Library from material ui and styles
import { TextField,Button,Typography, Paper, Box} from '@material-ui/core';
import useStyles from './styles'; 
import { Card,  CardMedia } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish'; 
//React and other
import { useState,useEffect, memo} from "react";
import { useParams } from "react-router-dom"; 
import addImage from 'images/add_image.png';
import moment from 'moment';  
import { elementNotInAnotherArray, removeItem } from 'util/HandleArray';
import { Avatar, Grid } from '@mui/material'; 
import { dataCreatePost, dataUpdatePost } from 'actions/posts';
import { useDispatch } from 'react-redux';

const FormCreatePost = ({data,create,onClosePost,handleShowMessage}) => {
    const classes = useStyles(); 
    //Change image ui when user upload file image
    const [images, setImages] = useState(data.img || null);
    //take id from url 
    const { id } = useParams();
    const dispatch = useDispatch(); 
    //Form data to client
    let [postData,setPostData] = useState({nameUser:id,description:data.description, dataUser:data.dataUser});
    console.log(postData);
    // Create new Post
    const handleSubmitCreate = (e) =>{
        e.preventDefault(); 
        const formData = new FormData();
        if(images.length !== 0) {
            for (const single_file of images) {
                formData.append('uploadedImages', single_file)
            }
        }
        formData.append('description',postData.description);
        formData.append('_id', id);
        dispatch(dataCreatePost(formData));
        handleShowMessage();
        onClosePost(); 
    }

    //Update Post
    const handleSubmitUpdate = (e,data)=>{
        e.preventDefault();
        const idPost = data._id; 
        //remove item have in images return new array contain new images has added
        const newListImage = removeItem(images, data.img); 
        const imageRemove = elementNotInAnotherArray(images, data.img);    
        const formData = new FormData();
        //Change Description 
        if(postData.description !== data.description)
            formData.append('description',postData.description); 
        //add deleted images to formdata 
        if(imageRemove.length > 0){  
            for (const image of imageRemove) 
                formData.append('imageRemove', image);    
        }
        //add new images to formdata
        if(newListImage.length !== 0){  
            for (const single_file of newListImage) 
                formData.append('uploadedImages', single_file);  
        }
        if((Array.isArray(imageRemove) && !imageRemove.length ) && (Array.isArray(newListImage) && !newListImage.length) && postData.description === data.description){
            console.log("Description and image not change"); 
        }
        dispatch(dataUpdatePost({formData,idPost})); 
        handleShowMessage();  
        onClosePost(); 
    } 
    const handleArrImage = (item) => {  
        let newListAvatar = removeItem(images, item); 
        setImages(newListAvatar);
    }
    //handle image when upload from user
    const handleFile = (e) => {
        const file = e.target.files;
        for(let i = 0; i<file.length; i++){ 
            file[i].preiew = URL.createObjectURL(file[i]) 
        } 
        setImages(Array.from(file).concat(images ? images : [])); 
    }  
    //remove url image has create when user upload 
    useEffect(()=>{
        return ()=>{
            if(images)
                for(let i = 0; i<images.length; i++)
                    URL.revokeObjectURL(images[i].preiew);  
        }
    },[images])
    return (
        <>
            <Grid container sx={{height:"100%"}} rowSpacing={1}> 
                <Grid item xs={8} sx={{position:"relative"}}>
                    { 
                        images 
                            ? <Box className={`${classes.srollImagePost}`}> 
                                {
                                    images?.map((item,index) => ( 
                                        <Card className={classes.card} key={index}> 
                                            <CardMedia className={classes.media} image={item.preiew || `http://localhost:5000/images/${item}`}/>
                                            {create ? <Button className={classes.removeImage} onClick={() => handleArrImage(item)}>X</Button> : <></>} 
                                        </Card>  
                                    ))  
                                } 
                            </Box>
                            : <Card className={classes.card}> 
                                <CardMedia className={classes.media} image={addImage}/>
                            </Card> 
                    }
                </Grid>
                {create 
                    ?  <Grid item xs={4} sx={{padding:"1%"}}>
                    <Paper className={classes.paper}>  
                        <div> 
                            <Typography className={classes.heading} variant="h5" >{!data  ? "Create" : "Update" } post</Typography>
                            <TextField className={classes.formInput} label="description" value={postData.description || ""} id="description" onChange={(e) => setPostData({...postData,description:e.target.value}) }/>
                        </div>
                        <div className={classes.Inupt} >
                            <label htmlFor="img" className={classes.label}>
                                <div className={`${classes.Inupt} ${classes.uploadImg}`}>
                                    <PublishIcon className={classes.iconUpload}/>
                                </div>
                                <strong>Choose a file</strong>
                            </label>
                            <input className={classes.file} id ="img" type="file" multiple="multiple" onChange={handleFile} alt="" />
                        </div>
                        {
                            !data
                                ? <Button onClick={handleSubmitCreate} className={`${classes.formInput} ${classes.Inupt}`} variant="contained" type="submit" >Create</Button>
                                : <Button onClick={(e)=>handleSubmitUpdate(e,data)} className={`${classes.formInput} ${classes.Inupt}`} variant="contained" type="submit" >Update</Button>
                        } 
                    </Paper> 
                    </Grid>
                    : <div className={classes.infoOfPost}>   
                        {postData.dataUser &&
                            <Box sx={{display: 'flex', alignItems:"center", gap: "15%",marginBottom:'15%', flexDirection: 'column'}}> 
                            <Avatar src={ `http://localhost:5000/images/${postData.dataUser.avatar}`}/>
                            <Typography variant='subtitle1' >{postData.dataUser.name}</Typography>
                        </Box>
                        }
                        <Box sx={{display: 'flex', alignItems:"center",marginBottom:'15%', flexDirection: 'column'}}> 
                            <Typography variant="h6">{data.description}</Typography> 
                            <Typography variant="body2" > {moment(data.createdAt).fromNow()}</Typography> 
                        </Box>
                    </div> 
                } 
            </Grid>
        </>
    )
}

export default memo(FormCreatePost);