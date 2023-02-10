const initialState = {
    notesUser: [], 
    result: false,
    message:"",
}

export default (state = initialState, action) => { 
    switch(action.type){ 
        case 'FETCH_NOTES_USER':
            return {...state, notesUser: action.payload}; 
        case 'DATA_CREATE_NOTE':
            return {...state, notesUser:[action.payload.data, ...state.notesUser], result: true, message: action.payload.message};  
        case 'DATA_UPDATE_NOTE':
            return {...state, result: true, message: action.payload.message};  
        case 'DATA_DELETE_NOTE':
            return {...state, result: false, message: action.payload.message};   
        default:
            return state;
    }
}