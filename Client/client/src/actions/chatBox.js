import * as api from '../api';


export const fetchChatBox = () => async (dispatch) => {
    try {
        const { data } = await api.fetchChatBox();
        dispatch({ type: 'FETCH_CHATBOX', payload: data }) 
    } catch (error) {
        console.log(error.message)
        dispatch({ type: 'FETCH_FAIL' }) 
    }
} 