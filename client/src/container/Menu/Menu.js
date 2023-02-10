import { useRef, useState, useEffect, createRef } from "react"; 
import { memo } from 'react'
import { Avatar,Button } from "@material-ui/core"; 
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Container, AppBar } from '@material-ui/core'; 

import NightsStayIcon from '@material-ui/icons/NightsStay';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import memories from 'images/memories.png'; 
import useStyles from './styles';
import {  Link } from "react-router-dom";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { menuItems } from 'constants';
  const Menu = ({value}) => {
    const user = JSON.parse(localStorage.getItem('token'));
    const [page,setPage] = useState(value && 0);
    const [theme,setTheme] = useState(true);
    const [showMenu,setShowMenu] = useState(false);
    const classes = useStyles(); 

    const handlerLogOut = () =>{
      localStorage.removeItem("token");
      window.location.href = '/';
    }
    menuItems[1].href = `/user/${user._id}`;  
    return (
      <>
      {user && 
        <Container maxidth="lg">
          <AppBar position='static' color='inherit' 
            style={{
              borderRadius: 15,
              margin: '15px 0',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center', 
              position:'inherit' 
            }}
          >
              {/** Button in menu */}
              <button onClick={()=>setShowMenu(prev =>!prev)} style={{display:"none"}}><MenuOpenIcon /></button>
              <div className={classes.menu} >
                {menuItems.map((item, index) => (
                  <div key={index} className={`${ page === index && classes.guideBar}`}  onClick={() => setPage(index)}>
                    <Link to={`${item.href}`} className={classes.item}> {item.name}</Link>
                  </div>
                ))} 
            </div>

          {/**Switch theme */}
          <FormControlLabel 
              control={<Checkbox 
              checked={theme}
              icon={<NightsStayIcon/>}
              checkedIcon={<Brightness7Icon/>}
              onChange={(e) => setTheme(prev => !prev)}
          />} />
 
      
          {/**Button Logout */}
          <div className={classes.logout}>
            {user.avatar === undefined 
              ? <Avatar alt="user" src={memories} />
              : <Avatar alt="user" src={`http://localhost:5000/images/${user.avatar}`} />
            }
            <Button color="inherit" onClick={handlerLogOut}>Logout<ExitToAppIcon  fontSize="large"/></Button>
          </div> 
        </AppBar>
      </Container> 
  }
     </>
    )
  }  

export default memo(Menu);