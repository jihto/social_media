import AddIcon from '@material-ui/icons/Add'; 
import CottageIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import PublicIcon from '@material-ui/icons/Public';
import SettingsIcon from '@material-ui/icons/Settings';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import FavoriteIcon from '@material-ui/icons/Favorite';

import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';

import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { Button, CssBaseline} from "@material-ui/core"; 
import Box from '@mui/material/Box';
import { Zoom, Slide } from '@material-ui/core';
import React from 'react';

export const TransitionZoom = React.forwardRef(function Transition(props, ref) {
    return <Zoom timeout={500} ref={ref} {...props} />;
}); 
export const TransitionSlide = React.forwardRef(function Transition(props, ref) {
    return <Slide timeout={500} ref={ref} {...props} />;
});


const fabStyle = { position: 'absolute', bottom: 16, right: 16,};
const fabGreenStyle = { color: 'common.white' }; 
export const fabs = [
    { id: 0, color: 'inherit',sx: fabStyle,icon: <AddIcon />, label: 'post',},
    { id: 1, color: 'primary',sx: fabStyle,icon: <AddIcon />,label: 'story',},
    { id: 2, color: 'secondary',sx: { ...fabStyle, ...fabGreenStyle },icon: <AddIcon />, label: 'video', },
];  

export const menuItems = [
    {
        name: <CottageIcon />,
        color: "black",
        href: "/home"
    },
    {
        name: <AccountCircleIcon />,
        color: "black",
        href: "/user/"
    },
    {
        name: <AddToPhotosIcon />,
        color: "black",
        href: "#"
    },
    {
        name: <PublicIcon/>,
        color: "black",
        href: "/chatBox"
    },
    {
        name: <SettingsIcon/>,
        color: "black",
        href: "/user/setting"
    }
];

export const ListInfo = [
    {
        name: "wordAt",
        icon: <WorkIcon/>, 
        placeholder:"Work at..."
    },{
        name: "education",
        icon: <SchoolIcon/>,
        placeholder:"Study at..."
    },{
        name: "location",
        icon: <EditLocationIcon/>,
        placeholder:"Live in..."
    },{
        name: "isSingle",
        icon: <FavoriteIcon/>,
    }
]

export const basicInfo = [
    {
        name: "phoneNumber",
        icon: <CallIcon/>,
        placeholder: "Phone..."
    },{
        name:"mail",
        icon: <EmailIcon/>,
        placeholder:"Mail..."
    },{
        name:"social",
        icon:<GitHubIcon/>,
    },{
        name:"social",
        icon: <TelegramIcon/>
    } 
]

export const ListNameInfo = [
    "workAt","education","location",
]
export const ListBasicInfo = [
    "phoneNumber","mail",[] 
]


export const CustomButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'white',
    borderColor: 'darkgray',
    color: 'black',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: 'black',
      borderColor: 'white',
      color: 'white',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'black',
      borderColor: 'white',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

export function LinearDeterminate() {
    const [progress, setProgress] = React.useState(0);
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = 500 * 1000;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    );
  }