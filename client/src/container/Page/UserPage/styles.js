import { makeStyles } from '@material-ui/core/styles';
import { styled } from "@mui/system";
import {  Button } from '@material-ui/core';
export default makeStyles(() => ({
  Box: {
    borderRadius: 15,
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
},
  avatar: {
    width: '70px',
    height:' 70px',
    margin: '1% 2% 1% 10%',
  },
  image: {
    marginLeft: '15px',
  },
  menu:{
    marginLeft: '10%'
  },
  about:{
    padding: '7%',
    fontFamily: 'system-ui',
    fontSize: 'large'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 31%'
  },
  name:{
    fontFamily: 'inherit',
  },
  infor:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  }, 
  flex:{
    borderRadius: 15,
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonCreate:{
    position:'fixed',
    bottom:'5%',
    width: '8%',
  },
  Inupt:{
    boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    borderRadius: '30px',
    backgroundColor: '#whitesmoke',
    height: '42px',
    color: 'steelblue',
    margin:'10px',
  },
  dialog:{
    backgroundColor: '#192033',
    color: 'steelblue',
    borderRadius: '20px'
  },
  file:{
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'Hidden',
    position: 'absolute',
    zIndex: '-1',
  },
  label:{
    display: 'flex',
    alignItems: 'center',
    color: 'aqua',
    width: '150px',
    background: '#192033',
    borderRadius: '25px',
  },
  uploadImg:{
    width:'30px',
    height:'30px',
    background: '#474d5c',
    margin:'6px',
  },
  iconUpload:{
    margin: '3px'
  },
  avatarImg:{
    width:'100%'
  },
  row:{
    display:'flex',alignItems: 'center'
  },  
  flexEnd:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },  
  messageAfterHandle:{
    position: 'fixed',
    bottom: '3%',
    left: '2%',
  }
}));

export const ButtonElementGroupRight = styled(Button)({
    borderRadius: ' 20px 0 0 20px',
    borderRight: '1px solid black',
  "&:hover":{
    background: "rgba(0,0,0,0.2)",
    color:"white"
  }
});
export const ButtonElementGroupLeft = styled(Button)({
    borderRadius: '0 20px 20px 0px',
    borderLeft: '1px solid',
  "&:hover":{
    background: "rgba(0,0,0,0.2)",
    color:"white"
  }
});

export const CustomButton = styled(Button)({
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