const initialState = {
    user: [], 
}


export default (state = [] ,action) => {
    switch(action.type){ 
        case 'FETCH_FOLLOWER':
            return action.payload;
        default:
            return state;
    }
}