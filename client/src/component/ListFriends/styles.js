import { makeStyles } from '@material-ui/core/styles';
import gsap from 'gsap';
// import { random } from 'gsap/all';  
export default makeStyles(() => ({
  heading: {
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5%',
    width: '90%',
  },
  search:{
    margin: '3px 0 0 10%',
    width: "76%"
  },
  connected:{
    marginBottom: '5%',
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    borderRadius:'10px',
  },
  textLocation:{
    fontFamily: 'fangsong',
    margin: '9px 9px 0 9px'
  },
  find:{
    display: 'flex',
    alignItems: 'center',
  },
  iconFind:{
    margin: '19px 10% 0 0'
  }, 
  '@keyframes MoveUpDown': {
    "0%" : { 
      transform: "translateX(0)", 
    }, 
    "100%" : {
      transform: "translateX(100%)", 
    }
  },
  showAllNewFriends:{ 
    position: 'fixed', 
    display: 'flex', 
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    WebkitBoxPack: 'center', 
    justifyContent: 'center',
    right: '0',
    bottom: '0',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent',
    zIndex: '-1',
  }
}));