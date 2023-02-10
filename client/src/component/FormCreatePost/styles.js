
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  box: {
    borderRadius: 15,
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  formInput:{
    width: '90%',
    color: 'aqua',
    margin: '6%'
  },
  heading:{
    margin: '0 20px 0 20px',
    paddingTop: '20px',
  },
  file:{
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'Hidden',
    position: 'absolute',
    zIndex: '-1',
  }, 
  Inupt:{
    boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    borderRadius: '30px',
    backgroundColor: '#192033',
    height: '42px',
    color: 'steelblue',
  }, 
  paper: {
    padding: theme.spacing(2),
    borderRadius:"15px",
    width: '94%',
    marginLeft:'1%',
    height: '96%'
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
  iconUpload:{
    margin: '3px'
  }, 
  media: {
    height: "100%", 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundBlendMode: 'darken', 
  },  
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px', 
    position: 'relative', 
    marginBottom: "3%",
    height:"100%",
    width:"100%", 
    scrollSnapAlign: 'start',
    scrollMarginLeft: '0', 
    marginRight:"1%"
  },     
  srollImagePost:{
    position: 'absolute',
    right: 0,
    width: '100%',
    height: '100%', 
    display: 'flex', 
    flexWrap: 'wrap',
    flexDirection: 'column',
    scrollSnapType: 'x mandatory',
    overflowX: 'scroll',  
    '&::-webkit-scrollbar': {
      height: '1px', 
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'white' 
    },
    '&::-webkit-scrollbar-track':{
      background: 'black' 
    }, 
  },
  removeImage:{
    position: 'absolute',
    top: 0,
    color: 'white',
    right: 0,
    fontSize: '20px',
    borderRadius: '25%'
  }
}));