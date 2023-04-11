import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logout:{
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20%',
  },
  link:{
    display: 'flex',
    alignItems: 'center',
    color: 'black',
    textDecoration: 'none',
    marginRight: '2.5%',
    marginLeft: '1%'
  },
  
}));