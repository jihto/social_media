//Material Ui
import useStyles from './styles';  
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditIcon from '@material-ui/icons/Edit';  
import SaveIcon from '@material-ui/icons/Save';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';  
import DescriptionIcon from '@material-ui/icons/Description';
import { Button } from '@material-ui/core';
import {Input, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert, AlertTitle, SpeedDial, SpeedDialIcon, SpeedDialAction} from '@mui/material';
import Slide from '@mui/material/Slide';
//Other 
import { TransitionZoom } from 'constants';
import React,{ useState, memo,} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { dataCreateNote, dataUpdateNote, dataDeleteNote } from 'actions/note';
const Note = ({note, isUser}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const result = useSelector(state => state.note.result); 
    const message = useSelector(state => state.note.message);

    const [showTools, setShowTools] = useState(note ? false : true)
    //Change text Note
    const [text, setText] = useState(note ? note.textNote : "");
    //Change Color Note 
    const [color, setColor] = useState(note ? note.color : "steelblue");
    //Show message When creat, update, delete note
    const [showMessage, setShowMessage] = useState(false);
    //Open dialog delete
    const [open, setOpen] = useState(false);
    //Opacity when user delete 
    const [hideNote, setHideNote] = useState(false); 
    const idUser = JSON.parse(localStorage.getItem("token"))._id;
    const containerRef = React.useRef(null);


    const handleShowMessage = () =>{
        setShowMessage(true);
        setTimeout(()=>{
            setShowMessage(false);
        },3000)
    }

    const handleDeleteNote = () => {
        dispatch(dataDeleteNote(note._id));
        setHideNote(true);
        setOpen(false);
        handleShowMessage();
    }

    const handleNote = () => { 
        if(note){
            dispatch(dataUpdateNote(note._id, {newTextNote: text, color}));
        }else{
            text && dispatch(dataCreateNote({idUser, textNote: text, color}));
            setText("");
            setColor("steelblue"); 
        }  
        handleShowMessage();
    }  
    return (
        <> 
            <Box className={classes.text} style={{ background:`${color}`, opacity:`${hideNote && "0.5"}` }}>
                <ThemeProvider
                    theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                                disableTouchRipple: true,
                            },
                        },
                    },
                    palette: {
                        mode: 'dark',
                        primary: { main: 'rgb(102, 157, 246)' },
                        background: { paper: 'rgb(5, 30, 52)' },
                    },
                    })} 
                > 
                    <Box 
                        sx={{ transform: 'translateZ(0px)', 
                            overflow: 'hidden',
                            flexGrow: 1, 
                            borderRadius:"15px",
                            boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
                        }}
                        ref={containerRef} 
                    > 
                        {
                            showMessage 
                                ? result
                                    ? <Slide direction="right" in={true} container={containerRef.current}>
                                        <Alert severity="success" sx={{ background: "#179500", padding: 0, borderRadius: "15px 15px 0 0"}}>
                                            <AlertTitle>{message}</AlertTitle> 
                                        </Alert>
                                    </Slide>
                                    :  <Slide direction="right" in={true} container={containerRef.current}>
                                        <Alert severity="error" sx={{ background: "red", padding: 0, borderRadius: "15px 15px 0 0"}}>
                                            <AlertTitle>{message}</AlertTitle> 
                                        </Alert>
                                    </Slide>
                            : <Button className={classes.iconDelete} onClick={()=>isUser && note && setOpen(true)}>
                                { isUser 
                                    ? note 
                                        ? <DeleteForeverIcon /> 
                                        : <EditIcon/> 
                                    : <DescriptionIcon/>
                                }
                                </Button>  
                        }
                        <TextareaAutosize  
                            value = {text} 
                            autoFocus={note ? false : true}
                            style = {{height:"230px"}} 
                            className = {classes.textInput} 
                            onFocus={() => note && setShowTools(true)} 
                            // onBlur={() => note && setTimeout(()=>{
                            //     if(!focus){
                            //         setShowTools(false)
                            //     }
                            // },3000)}
                            disabled={!isUser}
                            onChange={(e) => setText(e.target.value)} 
                            placeholder = "Note..." 
                        />
                        { showTools &&
                            <SpeedDial
                                ariaLabel="SpeedDial openIcon example"
                                sx={{ 
                                    position: 'absolute', bottom: 10, right: 16,
                                    "& >button":{ background:color }, 
                                    "& >button:hover":{ background: color}
                                }}
                                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                            > 
                                    <SpeedDialAction icon={note ? <SaveIcon /> : <NoteAddIcon/>} tooltipTitle={`${note ? "Save" : "Create"}`} onClick={handleNote}/>
                                    <SpeedDialAction icon={<FileCopyIcon />} tooltipTitle="Copy Text" onClick={()=>navigator.clipboard.writeText(text)}/> 
                                    <SpeedDialAction icon={<Input value="#ffffff" disableUnderline type="color" fullWidth onChange={(e)=> setColor(e.target.value)}/>} 
                                        tooltipTitle="Change Color Note"  
                                    /> 
                            </SpeedDial>    
                        }         
                    </Box>  
                </ThemeProvider>
            </Box>  
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={()=>setOpen(false)}
            TransitionComponent={TransitionZoom}
            transitionDuration={{ enter: 500, exit: 500 }}
            aria-labelledby="responsive-dialog-title"
            PaperProps = {{ style:{ backgroundColor: '#bdc3c7', boxShadow: 'none',  borderRadius: ' 15px', margin: '2%'},}} 
        >
            <DialogTitle id="responsive-dialog-title">
                {"Do you wan't delete this note?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {note ? note.textNote : ""}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleDeleteNote}>
                    Agree
                </Button>
                <Button autoFocus onClick={()=>setOpen(false)}>
                    Disagree
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default memo(Note);