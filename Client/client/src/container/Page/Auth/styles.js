
 
import { makeStyles } from '@material-ui/core/styles';
import { styled } from "@mui/system";
import {  Button } from '@material-ui/core';

export default makeStyles(() => ({  
    showDes:{  
        left:' 40%',
    },
    hideDes:{ 
        left:"-80%",  
    },
    boxCard:{  
        boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        borderRadius:"15px", 
        position:"relative",
        transition: "all 0.8s", 
        cursor: 'cell',
    },
    defaultFormat:{
        transition: "all 0.8s", 
        position: 'absolute',
        top: '40%',
    }
    }))

    export const CustomButtonIcon = styled(Button)({ 
        boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        fontSize: '25px',
        borderRadius:'8px',
        color: '#1672ea', 
        textTransform: 'inherit',
        background:"white", 
        cursor: 'cell',
      "&:hover":{
        backgroundColor:"whitesmoke" ,
        paddingLeft:"2%",
        paddingRight:"2%",  
        borderRadius:'50px',
      }
    });

    export const ButtonPrevNext = styled(Button)({  
        fontSize: '15px',
        padding:"10px", 
        textTransform: 'inherit',
        borderRadius:'5px',
        boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        background:"white",
        position: 'absolute',
        top: '40%',
        opacity: '0.6',
      "&:hover":{
        opacity:1,
        backgroundColor:"whitesmoke" 
      }
    });