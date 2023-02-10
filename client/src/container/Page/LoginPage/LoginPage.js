import { useState } from 'react';
import { styled } from '@mui/material/styles';
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
import LinearProgress from '@mui/material/LinearProgress';

import { Button, CssBaseline} from "@material-ui/core";


import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from 'actions/auth';
import { Container } from '@mui/system';

export default function Login() { 
  const loading = useSelector((state) => state.auth.loading);
  const messageRes = useSelector(state => state.auth.message); 
   const dispatch = useDispatch()
  
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
  return (
    <Container>
      <Grid container component="main" sx={{marginTop:`${isSignUp ? "10%" : "8%"}`, }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}></Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{borderRadius:"15px"}}>
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

const CustomButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'white',
    borderColor: 'black',
    color: 'black',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: 'black',
      borderColor: 'white',
      color: 'white',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'black',
      borderColor: 'white',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

  function LinearDeterminate() {
    const [progress, setProgress] = React.useState(0);
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = 500 * 1000;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    );
  }