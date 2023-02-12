import { makeStyles } from '@material-ui/core/styles'; 
import { styled } from "@mui/system";
import {  Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
export default makeStyles(() => ({
    cardPost:{
        borderRadius: '10px', 
        position:"relative", 
      }, 
      mediaPost:{
        paddingTop: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        position:"relative",
      },  
      Inupt:{
        boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        borderRadius: '30px',
        backgroundColor: '#whitesmoke',
        height: '42px',
        color: 'steelblue',
        margin:'10px',
      },
      card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px', 
        width:"500px",
        position: 'relative',
      },  
      multipleImage :{
        position: 'absolute', 
        top: '0', 
        left: '0', 
        color: 'white',
        zIndex:10
      },
      cardActions:{
        position: 'absolute', 
        top: '0', 
        right: '0', 
        color: 'white',
      },  
      buttonHandle:{
        color:'white'
      },
      showDes:{ 
        left:"35%",
      },
      hideDes:{ 
        left:"-100%", 
      },
      description:{
        position:"absolute",
        top:"40%",
        zIndex:10,
        color:"white",
        transition: "all 0.8s", 
        textShadow: '#AAC6C6 1px 0 10px',
        cursor:"pointer"
      } 
}))


export const ButtonDelete = styled(Button)({
  background: '#d93333',
  color: 'white',
  border: 'none',
  borderRadius: '7px', 
  fontWeight:'bold',
  "&:hover":{
    background: "red", 
    border:'none'
  }
});
export const ButtonCancel = styled(Button)({
  color: 'black', 
  borderRadius: '7px',
  padding:' 2% 4%',
  fontWeight:'bold',
  "&:hover":{
    background: "rgba(0,0,0,0.2)", 
  }
});