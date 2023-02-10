import * as api from '../api';

export const getDataFollower = (search) => async (dispatch) => {
    try { 
        const { data } = await api.fetchDataFollower(search);
        dispatch({ type: 'FETCH_FOLLOWER', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}