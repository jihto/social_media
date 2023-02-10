import * as api from '../api';
export const getAllNotesUser = (idUser) => async(dispatch) =>{
    try {
        const {data} = await api.fetchNotes(idUser);
        dispatch({
            type: "FETCH_NOTES_USER",
            payload: data
        })
    } catch (error) {
        console.log(error);        
    }
}


export const dataCreateNote = (formData) =>async(dispatch) => {
    try {
        const {data} = await api.createNote(formData); 
        dispatch({ type:'DATA_CREATE_NOTE', payload: data });
    } catch (error) {
        dispatch({ type: "NOTE_FAIL", payload: error });
    }
}

export const dataUpdateNote = (_id, formData) =>async(dispatch) => {
    try {
        const {data} = await api.updateNote(_id, formData); 
        dispatch({ type:'DATA_UPDATE_NOTE', payload: data });
    } catch (error) {
        dispatch({ type: "NOTE_FAIL", payload: error });
    }
}
export const dataDeleteNote = (_id) =>async(dispatch) => {
    try {
        const {data} = await api.deleteNote(_id); 
        dispatch({ type:"DATA_DELETE_NOTE", payload: data });
    } catch (error) {
        dispatch({ type:"NOTE_FAIL", payload: error });
    }
}