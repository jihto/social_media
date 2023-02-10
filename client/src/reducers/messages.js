export default (messages=[],action) => {
    switch(action.type){ 
        case 'FETCH_MESSAGES':
            return action.payload;
        case 'FETCH_MESSAGES_FAIL':
            return messages; 
        default:
            return messages;
    }
}