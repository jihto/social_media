export default (chats=[],action) => {
    switch(action.type){
        case 'FETCH_CHATBOX':
            return action.payload;  
        case 'FETCH_FAIL':
            return chats; 
        default:
            return chats;
    }
}