
import * as api from '../api'; 

export const loginUser = (Verification) => async (dispatch) => {
    dispatch({type:"AUTH_START"});
    try {
        const { data } = await api.login(Verification);
        if(data){
            localStorage.setItem("token", JSON.stringify(data)); 
            dispatch({ type: 'LOGIN_SUCCESS', payload: data }) 
        } 
    } catch (error) {
        console.log(error.message)
        dispatch({type:"AUTH_FAIL"})
    }
}

export const registerUser = (Verification) => async(dispatch) => {
    dispatch({type:"AUTH_START"});
    try {
        const { data } = await api.register(Verification);
        dispatch({ type: 'REGISTER_SUCCESS', payload: data }) 
    } catch (error) {
        console.log(error.message)
        dispatch({type:"AUTH_FAIL"})
    }
}

