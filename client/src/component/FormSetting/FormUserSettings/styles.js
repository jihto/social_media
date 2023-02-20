
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({ 
file:{
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'Hidden',
    position: 'absolute',
    zIndex: '-1',
},
uploadImg:{
    width:'30px',
    height:'30px',
    background: '#474d5c',
    margin:'6px',
},
label:{
    display: 'flex',
    alignItems: 'center',
    color: 'aqua',
},
formInput:{
    width: '100%%',
    color: 'aqua',
    margin: '0 4% 2% 0'
},
boxCard:{
    boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    borderRadius: '30px',
    backgroundColor: '#192033', 
    color: 'steelblue',
    
},
paper: {
    padding: theme.spacing(2),
    borderRadius:"15px",
    boxShadow: '22px 0px 34px 7px rgb(0 0 0 / 20%), 11px 2px 15px 0px rgb(0 0 0 / 14%), 7px 1px 3px 0px rgb(0 0 0 / 12%)',
    height: '100%',
},
fullSize:{
    width:'100%',
    height:"100%"
},
formSetting:{
    padding:"2% 7%"
},
textRandom:{
    fontFamily: 'cursive',
    textShadow: '2px 2px gray',

},
verify:{
    display:"flex",
    margin: "2% 0",alignItems: 'center',
    "& >input":{
        width:"10%",
        margin:"0 4% 0 2%",
        padding: '1%',
        fontSize: '15px',
    }
},
GroupButton:{
    display: 'grid',
    height:' 100%', 
    alignContent: 'space-evenly',

}
}));