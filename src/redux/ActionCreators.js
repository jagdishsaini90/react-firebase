import * as ActionTypes from './ActionTypes';
import firebase from 'firebase'
import { auth } from '../firebase/firebase'; 

export const loginRequest = () => ({
        type : ActionTypes.LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
        type : ActionTypes.LOGIN_SUCCESS,
        payload : user
});

export const loginFailed = (errMess) => ({
        type : ActionTypes.LOGIN_FAILED,
        payload : errMess
});


export const loginUser = (creds) => async (dispatch) => {

    dispatch(loginRequest(creds));

    return await auth.signInWithEmailAndPassword(creds.email, creds.password)
    .then(res => {
        var user = res.user;
        console.log("Logged in SuccessFully");
        localStorage.setItem('creds', JSON.stringify(user));
        dispatch(loginSuccess(user));
    })
    .catch(err => dispatch(loginFailed(err.message)));
};


export const signupRequest = () => ({
        type : ActionTypes.SIGNUP_FAILED,
});

export const signupSuccess = (user) => ({
        type : ActionTypes.SIGNUP_SUCCESS,
        payload : user
});

export const signupFailed = (errMess) => ({
        type : ActionTypes.SIGNUP_FAILED,
        payload : errMess
});

export const googleLogin = () => async (dispatch) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    await auth.signInWithPopup(provider)
    .then(res => {
        var user = res.user;
        console.log("Logged in SuccessFully");
        localStorage.setItem('creds', JSON.stringify(user));
        dispatch(loginSuccess(user));
    })
    .catch((error) => {
        dispatch(loginFailed(error.message));
    });
}


export const signupUser = (creds) => async (dispatch) => {

    dispatch(signupRequest(creds));

    return await auth.createUserWithEmailAndPassword(creds.email, creds.password)
    .then(res => {
        var user = res.user;
        console.log("Signup successfully");
        user.updateProfile({
            displayName : creds.displayName
        })
        localStorage.setItem('creds', JSON.stringify(user));
        dispatch(signupSuccess(user));
    })
    .catch(err => dispatch(signupFailed(err.message)));
};

export const logoutRequest = () => ({
        type : ActionTypes.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
        type : ActionTypes.LOGOUT_SUCCESS
});




export const logoutUser = () => (dispatch) => {

    dispatch(logoutRequest());

    auth.signOut()
    .then(() => {
        console.log("User logged out Successfully")
    })
    .catch(err => console.log(err.message));
    localStorage.removeItem('creds');
    dispatch(logoutSuccess());
};


