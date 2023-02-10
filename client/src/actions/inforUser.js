import * as api from '../api';

export const getInforUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchInforUser(id);
        dispatch({ type: 'FETCH_INFOR_USER', payload: data });
    } catch (error) {
        console.log(error.message)
    }
} 
export const getProfile = () => async(dispatch)=>{
    try {
        const {data} = await api.fetchProfile();
        dispatch({ type: 'FETCH_PROFILE', payload: data });
    } catch (error) {
        console.log(error.message);
    }   
}
export const getDataFollower = (search) => async (dispatch) => {
    try { 
        const { data } = await api.fetchDataFollower(search);
        dispatch({ type: 'FETCH_FOLLOWER', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}
export const dataUpdateAvatar = (formData) => async (dispatch) => {
    try {
        const { data } = await api.updateAvatar(formData);
        console.log(data)
        dispatch({ type: "DATA_UPDATE_AVATAR", payload: data });
    } catch (error) {
        dispatch({ type:"USER_FAIL", payload: error});
    }
}