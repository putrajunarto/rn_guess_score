import AuthAction from '../actions/AuthActions';
const initialState = {
    status: false,
    _user: {},
    _token: "",
    _profile: undefined,
}

function authReducer(state = initialState, action) {
    switch(action.type) {
        case AuthAction.SAVE_USER_INFO:
            const {_user} = action.payload;            
            return {...state, status:true,_user: _user};            
        case AuthAction.USER_LOGOUT:
            return initialState;
        case AuthAction.SAVE_USER_TOKEN:    
            console.log("Token saved");        
            const {token} = action.payload;            
            return {...state, _token: token};
        case AuthAction.UPDATE_USER_PROFILE:
            const {profile} = action.payload;
            return {...state, _profile: profile};
        default:
            return state;
    }
}

export default authReducer;