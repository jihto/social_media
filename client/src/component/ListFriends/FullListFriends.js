import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NewFriend from './Friend/Friend';
import { TransitionZoom } from 'constants';

export default function AddFriends({allData}) {
  const [open, setOpen] = React.useState(false); 
  const handleClickOpen = () => {
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
  }; 
  return (
    <> 
      <Button onClick={handleClickOpen}>See more</Button>
      <Dialog 
      fullWidth
        maxWidth="sm"
        TransitionComponent={TransitionZoom}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx:{ 
            borderRadius:'15px',
          }
        }}
      >
        <DialogTitle id="scroll-dialog-title">advance</DialogTitle>
        <DialogContent> 
          {
            !allData || !Array.isArray(allData)
            ? null
            : allData.map(user =>(
              <div key={user._id} >
                <NewFriend isFollower={false} user={user} showfull={true}/> 
              </div>
            ))} 
        </DialogContent>
        <DialogActions>  
        </DialogActions>
      </Dialog>
    </>
  );
}
