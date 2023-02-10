const initialState = {
    authData: null, 
    loading:false, 
    message:"",
    error:false
}
export default (state = initialState,action) => {
    switch(action.type){
        case 'AUTH_START':
            return {...state, loading : true, error: false};
        case "LOGIN_SUCCESS":
            return {...state, authData: action.payload, loading: false};
        case "REGISTER_SUCCESS":
            return {...state, message: action.payload, loading: false};
        case "AUTH_FAIL":
            return {...state, loading: false, error: true, message: action.payload};
        default:
            return state;
    }
}