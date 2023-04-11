import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { styled } from "@mui/system";

import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react";
export default makeStyles(()=>({
    box:{
        borderRadius: '15px',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        alignItems: 'center', 
    },
    headingTopChatBox:{
        display: 'grid',
        padding: '20px',
        gridTemplateColumns: '1fr 10fr',
        alignItems: 'center',
    },
    inputMessage:{
        margin: '0', 
        display: 'grid',
        gridTemplateColumns: '92% 10%',
    },
    buttonUsers:{
        width: '86%',
        margin: '2% 7%',
        display: 'flex',
        justifyContent: 'flex-start',
        padding:"3%"
    },
    contentMessage:{ 
        margin: '0',
        display: 'flex',
        alignItems: 'center', 
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    contentMessageUsers:{
        display: 'flex',
        alignItems:'center'
    },
    message:{ 
        padding: '1% 4%',
        fontFamily: 'sans-serif',
        borderBottomRightRadius:"0",
        width:' fit-content',
        background: 'cornflowerblue',
        color: 'white',
        marginBottom:'4%',
    },
    messageMember:{
        margin: '1% 7% 2% 0',
        padding: '1% 4%',
        fontFamily: 'sans-serif',
        borderBottomLeftRadius:"0",
        width:' fit-content',
        marginBottom:'4%',

    },
    avatarMessage:{
        margin: '15px 8px',
    },
    typing:{
        width:"fit-content", 
        borderBottomLeftRadius: '0',
    padding:' 0 2%',
    },

    templateCol:{
        display: 'grid',
        gridTemplateColumns: '33% 65%',
        gridAutoRows: '230%',
        justifyContent: 'space-between', 
        position: 'relative',
    },
    contentChatBox:{ 
        position: 'absolute',
        width: '100%',
        background: 'whitesmoke',  
        left: '0', 
        top: '100%',
    }
}))


export const CustomInput = styled(TextField)({ 
    "input":{
        background: 'white',
        margin: '1%',
        borderRadius: '92px',
        padding: '20px 25px 0 25px',
        border:'1px solid whitesmoke'
    },
    "label":{
        padding: '1px 20px',
    },
    "div":{
        background:'white'
    },
    "& div:hover":{
        background:'white'
    },  
});


export const CustomButton = styled(Button)({ 
    width:"15px",
    height:'58px', 
    borderRadius:"50%",
    "&:hover":{
        borderRadius:"50%",
        transform: 'rotate(-30deg)', 
    }, 
});

const NewInput = styled(TextField)({
     
});
const icons = [<SearchIcon/>]

export const InuptIcon = () =>{
    const [animation, setAnimation] = useState(false);
    return (
        <Box sx={{ 
                border: '1px solid whitesmoke',
                margin:' 2% 10% 5% 10%',
                borderRadius: '50px',
                flexGrow : 1
            }} 
        >
            <NewInput  
                variant='standard'
                size='small'
                placeholder="Search"
                sx={{ 
                    margin: "5px 8%",
                    width:'85%',
                    "& .MuiInput-root":{
                        display:'flex',
                        flexDirection: 'row-reverse',
                    },
                    "& .MuiInputBase-inputMarginDense":{
                        padding: '10px 16px'
                    }
                }}  
                InputProps={{
                    startAdornment: ( 
                        <Button >
                            {icons[0]}
                        </Button> 
                    ),
                }}
            />
        </Box> 
    )
}
export const ButtonCustom = styled(Button)({
    borderRadius: '20px',
    color: 'black',
    textTransform: 'none',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    padding: '6px 20px',
    margin: '0 8% 2% 7%',
    "&:hover":{
      background: "rgba(0,0,0,0.2)",
      // color:""
    }
  })