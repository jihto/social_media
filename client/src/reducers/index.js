import { combineReducers } from "redux"; 
import posts from './posts';
import user from './user';
import infoUser from './infoUser';
import auth from "./auth"; 
import chatBox from "./chatBox";
import messages from "./messages"
import note from "./note";
export default combineReducers({
    posts,
    user,
    infoUser,  
    auth,
    chatBox,
    messages,
    note
})