import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    text:{
      background: 'steelblue',
      borderRadius: '15px',
      width: '100%', 
    },
    Input:{
      margin: '3% 0 0 12%',
    },
    textInput:{
      resize:"none",
      height:'320px',
      width:"81%",
      padding:"8% 8% 0 8%",
      fontSize:"17px",
      borderRadius: '15px',
      border:'none',
      outline: "none",
      margin:"1px",
      background: 'whitesmoke',
      boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
    }, 
    iconDelete:{
      float:"right",
      borderRadius: "0 15px 0 0", 
    }
}))