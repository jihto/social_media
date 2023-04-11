const initialState = {
    savePosts: [],
    listPosts: [], 
    postsUser: [],
    result:false,
    message:"",
    error: null,
}

export default (state = initialState, action) => { 
    switch(action.type){
        case 'FETCH_ALL':
            return   {...state, listPosts: action.payload}; 
        case 'FETCH_POSTS_USER':
            return {...state, postsUser: action.payload};  
        case 'FETCH_SAVE_POST':
            return { ...state, savePosts: action.payload};
        case 'DATA_CREATE_POST':
            return { ...state, postsUser:[action.payload.data,...state.postsUser], result: true, message: action.payload.message};    
        case 'DATA_UPDATE_POST':
            return {...state, 
                postsUser: state.postsUser.map(post => post._id === action.payload.data._id ? action.payload.data : post),
                result: true, 
                message: action.payload.message,
            };
        case 'DATA_DELETE_POST':
            return {
                ...state, 
                postsUser: state.postsUser.filter(post => post._id !== action.payload.data._id),
                message: action.payload.message
            }
        case 'POST_FAIL':
            return { ...state, error: action.payload, result: false, message:"Create post fail"};  
        default:
            return state;
    }
}
