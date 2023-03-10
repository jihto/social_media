import { makeStyles } from '@material-ui/core/styles';
import { styled } from "@mui/system";
import {  Button } from '@material-ui/core';
export default makeStyles({
  media: { 
    height:"100%",
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transitionDuration: '3s',
    backgroundRepeat:' no-repeat', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: 'inline-block',
    scrollSnapAlign: 'start',
    scrollMarginLeft: '0',
    position:'absolute', 
  },
  hold:{  
    height: '100%',
    width: '100%',
    transitionDuration: '2s',
    backgroundRepeat:' no-repeat', 
    backgroundSize: 'contain', 
    backgroundPosition: 'center',
    scrollSnapAlign: 'start',
    scrollMarginLeft: '0',
    position:'absolute', 
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
    height: '100%',  
    position:"relative",
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white', 
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',   
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1%'
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px'
  }, 
  marginLeft:{
    marginLeft:'20px'
  }, 
  title: {
    padding: '0 16px',
  }, 
  userLike:{
    fontSize: 'small',
    color: 'steelblue',
  }, 
  hidePost:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px', 
  },
  stackImage:{
    position: 'absolute', 
    top: '0', 
    left: '0', 
    justifyContent:"start"
  },  
  imagePost:{ 
    display: 'inline-block',
    scrollSnapAlign: 'start',
    scrollMarginLeft: '0',
    width:'100%'
  },
  boxCard:{
    height: '100%', 
    width: '100%',
    position: 'relative', 
  },
  
  buttonImage:{ 
    position: 'absolute',
    bottom: '24%',
    background: 'none',
    width: '100%',
    "& >button":{
      color:"white"
    },
    "& .css-114p2tk-MuiMobileStepper-dot":{
      backgroundColor:"gray",
    },
    "& .css-26w9jf-MuiMobileStepper-dot":{
      backgroundColor:"white",
    }
  }, 
});

export const ButtonHide = styled(Button)({
  borderRadius: '20px',
  color: 'black',
  textTransform: 'none',
  boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  padding: '6px 20px',
  "&:hover":{
    background: "rgba(0,0,0,0.2)",
    // color:""
  }
})