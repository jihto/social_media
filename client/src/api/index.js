import { AppsTwoTone } from '@material-ui/icons';
import axios from 'axios';
const url =  'http://localhost:5000/'; 
const API = axios.create({baseURL: "http://localhost:5000/"});

API.interceptors.request.use(
    (req)=> {
        const data = JSON.parse(localStorage.getItem('token'))
        if(data){
            const token = data.token;
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
)  

API.interceptors.response.use(
    (res) => {
        return res
    },
    async (error) => { 
        // console.log(error)
        const originalRequest = error.config;
        let data =  JSON.parse(localStorage.getItem("token"));
        const refreshToken = data.refreshToken;
        if(error.response.status === 401 && error.response.statusText === "Unauthorized" && error.config && refreshToken){
        const id = data._id; 
        const email = data.email;
            originalRequest._retry = true;
            const response = await API.post(url + "authUser/token",{refreshToken,id,email})
                .then((result) => {    
                    data.token = result.data.token;
                    data.refreshToken = result.data.token;
                    console.log("old", data.token);
                    console.log("new",result.data.token);
                    localStorage.setItem("token",JSON.stringify(data)); 
                    return API(originalRequest);
                }) 
                Promise.resolve(response) 
        }
        return Promise.reject(error)
    }
) 
//Authentication
export const login = (Verification) => API.post(url + "authUser/login",Verification);
export const register = (Verification) => API.post(url + "authUser/register",Verification);
//Post
export const fetchPosts = () => API.get(url + "post"); 
export const fetchPostsUser = (id) => API.get(url + `post/${id}`);
export const fetchSavePost = (id) => API.get(url + `post/dataSavePost/${id}`); 
 
export const createPost = (NewPost) => API.post(url + 'post/create',NewPost); 
export const updatePost = (data) => API.put(url + `post/update/${data.idPost}`,data.formData);
export const deletedPost = (id) => API.delete(url + `post/delete/${id}`);
export const likePost = (data) => API.put(url + "post/like",data); 
export const unLikePost = (data) => API.put(url + "post/unLike",data); 
export const savePost = (data) => API.post(url + "post/savePost",data);
export const unSavePost = (data) => API.post(url + "post/unSavePost",data);
export const hidePost = (data) => API.post(url + `post/hide/${data.idPost}`,{idUser:data.idUser}) ; 
export const showPost = (data) => API.post(url + `post/show/${data.idPost}`,{idUser:data.idUser}) ; 

//User
export const fetchInforUser = (id) => API.get(url + `user/${id}`);
export const fetchDataFollower = (search) => API.get(url + `user/follower?search=${search}`); 
export const fetchProfile = () => API.get(url + "user/profile");
export const updateAvatar = (data) => API.put(url + `user/update`,data); 
export const followUser = (dataId) => API.put(url + "user/addFollow",dataId);
export const unFollowUser = (dataId) => API.put(url + "user/removeFollow",dataId);
export const updateInformation = (data) => API.put(url + "user/updateInfo",data);


//Chat Box
export const fetchChatBox = () => API.get(url + 'chatBox');
export const fetchMessages = (idChatBox) => API.get(url + `message/${idChatBox}`);
export const sendMessage = (data) => API.post(url + 'message/sentMessage', data);

//Note
export const fetchNotes = (idUser) => API.get(url + `note/${idUser}`);
export const createNote = (data) => API.post(url + "note/create",data);
export const updateNote = (_id, data) => API.put(url + `note/update/${_id}`, data); 
export const deleteNote = (_id) => API.delete(url + `note/delete/${_id}`);
