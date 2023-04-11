import useStyles from './styles';
import {CardMedia,Card,TextField,Button, Typography,Box } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { memo, useContext,useEffect,useState } from 'react'; 
import {Data} from "App"; 
import Grid from '@mui/material/Grid'; 
import CachedIcon from '@material-ui/icons/Cached';
import { updateAvatar } from 'api';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dataUpdateAvatar } from 'actions/inforUser';
// import {useLocation} from 'react-router-dom';

const FormUserSettings = ({secret,imageAvatar}) =>{
    const _id = useContext(Data)._id;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [pass,setPass] = useState(
        {  
            oldPass:'',
            newPass:'',
            confirmPass:''
        });
        
    const [verifyCode, setVerifyCode] = useState(""); 
    const [inputCode, setInputCode] = useState("");
    const [showError, setShowError] = useState("");
    const [showMessage, setShowMessgae] = useState(false);
    const [avatar, setAvatar] = useState();
        
    const handleAvatar = (e)=>{
        const file = e.target.files[0];
        file.preiew = URL.createObjectURL(file);    
        setAvatar(file);
    }

    const handleShowMessage = () => {
        setShowMessgae(true);
        setTimeout(() => {
            setShowMessgae(false);
        },3000)
    } 
    const handleSubmitChangeAvatar = () => {
        const file = avatar; 
        const formData = new FormData();
        formData.append('imageURL',file, file.name);
        formData.append('_id',_id);
        dispatch(dataUpdateAvatar(formData)); 
        handleShowMessage();
    }
    const handleSubmit = () => {
        if(inputCode === verifyCode){
            //Correct code
            if(pass.oldPass !== pass.confirmPass)
                setShowError("Password is not same");
            else if(pass.confirmPass === "" || pass.oldPass === "")
                setShowError("Password or confirm password is empty");
            else   
                setShowError("Update");
        }
        else
            //InCorrect code 
            setShowError("Incorrect code verify")
        randomText();
    } 
    const randomText = () => {
        let textRD = "";
        for(let i = 0; i<4; i++){
            const rd = Math.floor(Math.random() * 24) + 65;
            textRD += String.fromCharCode(rd);
        }
        setVerifyCode(textRD);
    } 
    useEffect(()=>{
        randomText();
    },[])
    useEffect(() => {
        avatar && URL.revokeObjectURL(avatar.preview)
    }, [avatar])
    return (    
            <>
                {
                    secret 
                    ?  <Grid container  spacing={2} className={classes.paper}>
                            <Grid item xs={8}>
                                <Card className={classes.fullSize}>
                                    <label htmlFor="img">
                                        <CardMedia 
                                            className={classes.fullSize} 
                                            image={ avatar 
                                                ? avatar.preiew 
                                                : imageAvatar 
                                                    ? `http://localhost:5000/images/${imageAvatar}` 
                                                    : "https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png"} 
                                        /> 
                                    </label>
                                </Card>  
                            </Grid>
                            <Grid item xs={4} >
                                <Box className={classes.GroupButton}>
                                    <Typography  variant="subtitle1">Choose image:</Typography> 
                                    <div className={classes.boxCard} >
                                        <label htmlFor="img" className={classes.label}>
                                            <div className={`${classes.boxCard} ${classes.uploadImg}`}>
                                                <PublishIcon className={classes.iconUpload}/>
                                            </div>
                                            <strong>Choose a file</strong>
                                        </label>
                                        <input className={classes.file} id ="img" type="file" name="imageURL" onChange={handleAvatar} alt="" />
                                    </div>
                                    <Button onClick={handleSubmitChangeAvatar} className={`${classes.formInput} ${classes.boxCard}`} variant="contained" type="submit"> Update</Button>
                                    {showMessage &&
                                        <Alert variant="outlined" severity="success">
                                            Update Avatar Successfully
                                        </Alert>
                                    }
                                </Box>
                            </Grid>
                        </Grid> 

                    : <Grid container  spacing={2} className={classes.paper}>
                        <Grid item xs={12}> 
                            <Typography>Change Password</Typography>  
                            <TextField 
                                className={classes.formInput} 
                                label="New password..." 
                                value={pass.newPass} 
                                onChange={(e)=>setPass({...pass,newPass:e.target.value})}
                                type="password"
                            /> 
                            <TextField 
                                className={classes.formInput} 
                                label="Password..." 
                                value={pass.oldPass} 
                                onChange={(e)=>setPass({...pass,oldPass:e.target.value})}
                                type="password"
                            /> 
                            <TextField 
                                className={classes.formInput} 
                                label="Confirm password..."  
                                value={pass.confirmPass} 
                                onChange={(e)=>setPass({...pass,confirmPass:e.target.value})}
                                type="password"
                            />
                            <Box className={classes.verify}>
                                <input 
                                    value={inputCode}
                                    onChange={(e)=>setInputCode(e.target.value)}
                                />
                                <Typography className={classes.textRandom}>{verifyCode}</Typography> 
                                <Button onClick={randomText}><CachedIcon/></Button>
                            </Box>  
                                <div style={{color:"red", margin:"2%"}}>{showError}</div> 
                            <Button onClick={handleSubmit} className={`${classes.formInput} ${classes.boxCard}`} variant="contained" type="submit">Accept</Button>
                        </Grid>
                    </Grid> 
                }
            </> 
    )
}


export default memo(FormUserSettings);