import * as api from '../api';

 
export const fetchMessages = (idChatBox) => async (dispatch) => {
    try { 
        const { data } = await api.fetchMessages(idChatBox);
        dispatch({ type: 'FETCH_MESSAGES', payload: data }) 
    } catch (error) {
        console.log(error.message)
        dispatch({ type: 'FETCH_MESSAGES_FAIL' }) 
    }
}