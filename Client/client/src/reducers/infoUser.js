const initialState = {
    user: [],
    notesUser: [],
    profile: [],
    avatar: null,
    message:"",
    error: null,
}


export default (state = initialState,action) => {
     switch(action.type){
        case 'FETCH_INFOR_USER':
            return  {...state, user: action.payload}; 
        case 'FETCH_PROFILE':
            return {...state, profile: action.payload}; 
        case 'DATA_UPDATE_AVATAR':
            return {...state, avatar: action.payload.data, message:action.payload.message}; 
        case 'USER_FAIL':
            return {...state, error: action.payload.data, message:action.payload.message};  
        default:
            return state;
    }
}