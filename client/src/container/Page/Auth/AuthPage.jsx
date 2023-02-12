import { useState } from 'react'; 
import * as React from 'react';  
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useDispatch } from 'react-redux';   
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';

import { CssBaseline} from "@material-ui/core";  
import useStyle, {ButtonPrevNext, CustomButtonIcon} from './styles';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from 'actions/auth';
import { Container } from '@mui/system'; 
import { CustomButton, LinearDeterminate } from 'constants';

export default function AuthPage() { 
  const loading = useSelector((state) => state.auth.loading);
  const messageRes = useSelector(state => state.auth.message); 
  const dispatch = useDispatch()
  const classes = useStyle();
  const [isSignUp,setIsSignUp] = useState(true); 
  const [check,setCheck] = useState({confirmPassword:"" ,state:false});

  const {register , handleSubmit , formState : {errors}} =  useForm();

  const onSubmit = (data) =>{ 
    setCheck({...check,state:false});
    if(isSignUp){ 
      dispatch(loginUser(data)); 
    }
    else{
      if(data.password !== check.confirmPassword){
        setCheck({...check,state: true});
      }else if(data.password === check.confirmPassword){ 
        dispatch(registerUser(data));
        setIsSignUp(true);
      }
    }
  } 
  const handleSignUp =()=>{
    setIsSignUp(!isSignUp) 
    setCheck({...check,state:false})
  } 
  const [changeButton, setChangeButton] = useState(0);
  const colorBackgroud = ["whitesmoke", "#1672ea", "#00a6e6", "black"];
  const colorText = ["black", "white","white","white"];
  return (
    <Container>
      <Grid container component="main" sx={{marginTop:`${isSignUp ? "10%" : "8%"}`,}}>
        <CssBaseline />
        <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} className={classes.boxCard}
        style={{backgroundColor: colorBackgroud[changeButton], borderRadius:'15px 0 0 15px'}}>
          <Box >
            <Typography variant='h5' sx={{padding:"10% 10% 45% 10%",color: colorText[changeButton]}}>Sign In with:</Typography>
            <ButtonPrevNext onClick={()=>setChangeButton(prev => prev > 0 ? prev-1 : 3)}>
             <NavigateBeforeIcon/> Prev 
            </ButtonPrevNext>
            <CustomButtonIcon className={`${classes.defaultFormat} ${changeButton === 0 ? classes.showDes : classes.hideDes}`}>
              G
              <span style={{color:"red"}}>o</span>
              <span style={{color:"yellow"}}>o</span>
              g
              <span style={{color:"green"}}>l</span>
              <span style={{color:"red"}}>e</span>
            </CustomButtonIcon>

            <CustomButtonIcon className={`${classes.defaultFormat} ${changeButton === 1 ? classes.showDes : classes.hideDes}`}>
              <FacebookIcon fontSize='large'/>acebook
            </CustomButtonIcon> 

            <CustomButtonIcon className={`${classes.defaultFormat} ${changeButton === 2 ? classes.showDes : classes.hideDes}`}>
              <TwitterIcon fontSize='large'/>Twitter
            </CustomButtonIcon>

            <CustomButtonIcon className={`${classes.defaultFormat} ${changeButton === 3 ? classes.showDes : classes.hideDes}`}>
              <GitHubIcon fontSize='large'/>Github
            </CustomButtonIcon>

            <ButtonPrevNext onClick={()=>setChangeButton(prev => prev < 3 ? prev+1 : 0)} style={{right:0}}>
              Next <NavigateNextIcon/>
            </ButtonPrevNext>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{borderRadius:"0 15px 15px 0"}}>
          <Box  sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
            <Typography component="h1" variant="h5">{ isSignUp ?  'Sign In' : 'Sign Up' }</Typography>
            <Box  noValidate  sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}> 
              <TextField 
                margin="normal" required fullWidth 
                id="email" label="Email Address" 
                autoComplete="email" autoFocus  
                {...register("email", { require:"This is required..." })} 
              />
              { !isSignUp && 
                <TextField 
                  {...register("name", { require : "this is required..." })}  
                  margin="normal" id="name" 
                  required fullWidth autoFocus
                  label="name" name="name" 
                  autoComplete="name" 
                />
              }
              <TextField 
                margin="normal" required fullWidth 
                label="Password" type="password" 
                id="password" autoComplete="current-password"
                {...register("password" , { require : "this is required..." })} 
                />
              { !isSignUp &&   
                  <TextField margin="normal"
                    onChange={(e)=>setCheck({...check, confirmPassword:e.target.value})}
                    required fullWidth name="confirmPassword" label="Confirm Password" 
                    type="password" 
                    id="confirmPassword" 
                    autoComplete="current-password"  
                  />
              }
              { errors.emmail?.message }
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> 
              {check.state && <span style={{color:'red'}}>Password is not same</span>}
              {messageRes && <span style={{color:'green'}}>{messageRes.message}</span>}
              {loading && <LinearDeterminate/>}
              <CustomButton type='submit' fullWidth sx={{ mt: 3, mb: 2 }} >{ isSignUp ?  'Sign In' : 'Sign Up' }</CustomButton>
            </form>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Typography onClick={handleSignUp} variant="body2" style={{cursor:"pointer"}}>
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}