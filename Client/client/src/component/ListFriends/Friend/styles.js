import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  heading: {
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '5%',
    width: '90%',
  },
  image: {
    marginLeft: '15px',
  },
  buttonIcon:{  
    outline: "none",
    border: 'none', 
    "&:hover":{
      backgroundColor:"none"
    }
  },
  logout:{
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20%',
  },
  card: {
    borderRadius: 15,
    display: 'flex', 
    justifyContent:' space-between',
    backgroundColor:  'whitesmoke',//'rgba(0, 0, 0, 0.12)',
    margin: '2% 5%', 
    padding: '0',
    position:"relative",
    alignItems:"center",
  },
  avatar:{
    margin:'2% ',
  },
  title:{
    fontSize: '15px',
  },
  redirectUserUi:{
    width: '40%',
    display: 'flex', 
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    "&:hover":{
      backgroundColor:"#8f8f8f"
    },
    "& >span":{
      display: 'flex',
      flexDirection: 'column',
    }
  },
  description:{
    fontWeight:"600",
    color:"#606060"
  }
}));