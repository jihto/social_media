import { Container } from '@material-ui/core';
import Menu from 'container/Menu/Menu'
import React, { useEffect } from 'react'
import FormUserSettings from '../../../component/FormSetting/FormUserSettings/FormUserSettings'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyles from './styles'; 
import FormSetting from '../../../component/FormSetting/FormSetting';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'actions/inforUser';
import { useLocation } from 'react-router-dom';
function Setting() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const location = useLocation();
    const imageAvatar = location.state;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const information = useSelector(state => state.infoUser.profile);
    const result = useSelector(state => state.user);
    useEffect(()=>{
        dispatch(getProfile());
    },[]);
    console.log(information)
    return (
        <>
        <Menu /> 
        <Container sx={{padding:0}}> 
            <Box className={classes.boxCard}>
                    <Typography component={'span'} variant='h5'>About</Typography>
                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 300 }} > 
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', width: '20%' }}
                    >{
                        ["Overview","Basic info","Avatar","Password","Contact","Item Six","Item 7"].map((item, index) => (
                            <Tab label={item} {...a11yProps(index)} sx={{textTransform: 'capitalize', alignItems: 'flex-start',fontWeight: 600}} key={index}/>
                        ))

                    } 
                    </Tabs>
                    
                    <TabPanel value={value} index={0} className={classes.detail}>
                        <FormSetting 
                            education= {information.education}
                            workAt={information.workAt}  
                            location= {information.location}
                            isSingle = {information.isSingle}
                            basic={true}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1} className={classes.detail}>
                        <FormSetting
                            phoneNumber = {information.phoneNumber}
                            mail = {information.mail}
                            socialMedia = {information.socialMedia}
                        basic={false}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}  className={classes.detail}>
                        <FormUserSettings secret={true} imageAvatar={imageAvatar}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}  className={classes.detail}>
                        <FormUserSettings/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Item Five
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        Item Six
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        Item Seven
                    </TabPanel>
                </Box> 
                </Box>
            </Container>
        </>
    )
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, height:"100%" }}> 
                    {children} 
                </Box>
            )}
            </div>
        );
}
export default Setting