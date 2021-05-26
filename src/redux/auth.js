import * as ActionTypes from './ActionTypes';


export const Auth = (state = {
    isLoading: false,
    isAuthenticated: false,
    user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state, isLoading : true, isAuthenticated : false, user : action.creds};

        case ActionTypes.LOGIN_SUCCESS:
            return {...state, isLoading : false, isAuthenticated : true, user : action.payload, errMess : ''};

        case ActionTypes.LOGIN_FAILED:
            return {...state, isLoading : false, isAuthenticated : false, errMess : action.payload};

        case ActionTypes.SIGNUP_REQUEST:
            return {...state, isLoading : true, isAuthenticated : false, user : action.creds};

        case ActionTypes.SIGNUP_SUCCESS:
            return {...state, isLoading : false, isAuthenticated : true, user : action.payload, errMess : ''};
        
        case ActionTypes.SIGNUP_FAILED:
            return {...state, isLoading : false, isAuthenticated : false, errMess : action.payload};

        case ActionTypes.LOGOUT_REQUEST:
            return {...state, isLoading:true, isAuthenticated : true};

        case ActionTypes.LOGOUT_SUCCESS:
            return {...state,isLoading: false,isAuthenticated: false,user: null, token :''};
        default: 
            return state;
    }
};