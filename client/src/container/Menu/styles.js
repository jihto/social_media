import { makeStyles } from '@material-ui/core/styles';  

export default makeStyles((theme) => ({
    menu:{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: '1',
        maxWidth:' 800px',
        margin: 'auto',
        borderBottom: '1px solid #eee',
        width:'50%'
    }  ,
        
    item:{
        padding: '5px 15px',
        cursor: 'pointer',
        transition: 'color .3s ease-out',
        textDecoration: 'none',
        color: '#111',
        letterSpacing:' 0.05em', 
        fontWeight: 700,  
        fontSize:"35px",
        
    },
    guideBar:{
      position:"relative",
      transition:"0.3s",
        '&::before': {
          position: "absolute",
          bottom:"1px",
          content:'""',
          width:"100%",
          height:"2px",
          background:"black",
          borderRadius:"50%"
        }
    },
    indicator:{  
        zIndex:' -1',
        borderRadius: '30px',
        width: "50px",
        height: "5px"
    }

    ,link:{
        color: '#111',
        textDecoration: 'none',  
         "&:hover": { 
            background:"dark",
        }
    },
    animation:{
        // animation: `$myEffect 1000ms ${theme.transitions.easing.easeInOut}`,
        background:"red",
    },
    moveAnimation:{
      zIndex:' -1',
      borderRadius: '30px',
      width: "50px",
      height: "5px",
      background:"red",
      animation: "$move 2s linear ", 
    },
    iconMenu:{
        fontSize:' 35px',
        // background:"darkgray",
    } ,
    logout:{
      display: "flex",
      alignItems:"center"
    },
    "@keyframes myEffect": {
        "0%": {
          opacity: 0,
          transform: "translateY(-200%)", 
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0)" ,
          
        } 
      },
    "@keyframes move": { 
        "0%": { 
            transform: "translateX(0)", 
            background:"black",
          },
          "100%": { 
            transform: "translateX(100px)",
            background:"black",
          }
        }
}))