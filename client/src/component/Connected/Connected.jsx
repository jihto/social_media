import useStyles from './styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import PinterestIcon from '@material-ui/icons/Pinterest';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Button } from '@material-ui/core';
import { memo } from 'react';

const Connected = () => {
    const classes = useStyles(); 
    return (
        <>
            <Button className={classes.shape}>
                <FacebookIcon fontSize="large" className={classes.face}/>
            </Button>
            <Button className={classes.shape}>
                <PinterestIcon fontSize="large" className={classes.pinter}/>
            </Button>
            <Button className={classes.shape}>
                <InstagramIcon fontSize="large" className={classes.ins}/>
            </Button>
            <Button className={classes.shape}>
                <GitHubIcon fontSize="large" className={classes.git}/>
            </Button>
        </>
    )

}

export default memo(Connected);