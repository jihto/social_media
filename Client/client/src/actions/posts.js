import * as api from '../api';


//Actions Creators 
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message)
    }
} 

export const getDataSavePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchSavePost(id); 
        dispatch({ type: 'FETCH_SAVE_POST', payload: data });
    } catch (error) {
        console.log(error.message)
    }
} 

export const getAllPostsUser = (id) => async(dispatch) =>{
    try {
        const { data } = await api.fetchPostsUser(id);
        dispatch({ type: "FETCH_POSTS_USER", payload: data})
    } catch (error) {
        dispatch({ type: 'POST_FAIL', payload: error });
    }
}

export const dataCreatePost = (formData) => async (dispatch) => {
    try {
        const { data } = await api.createPost(formData);  
        dispatch({ type: 'DATA_CREATE_POST', payload: data });
    } catch (error) {
        dispatch({ type: 'POST_FAIL', payload: error });
    }
}

export const dataUpdatePost = (formData) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(formData);
        dispatch({ type: "DATA_UPDATE_POST", payload: data});
    } catch (error) {
        dispatch({ type: 'POST_FAIL', payload: error });
    }
}

export const dataDeletePost = (formData) => async (dispatch) => {
    try {
        const { data } = await api.deletedPost(formData); 
        dispatch({ type: "DATA_DELETE_POST", payload: data});
    } catch (error) {
        dispatch({ type: 'POST_FAIL', payload: error });
    }
}
