import { memo } from 'react'; 
import Note from './Note/Note'
import Grid from '@mui/material/Grid';


function NoteList({ notesUser, showCreateNote, isUser }) {
    return (
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                showCreateNote && <Grid item xs={4}><Note isUser={isUser}/></Grid> 
            }
            {
                notesUser.map(note => (
                    <Grid item xs={4} key={note._id}>
                        <Note note={note} isUser={isUser}/>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default memo(NoteList);