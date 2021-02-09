import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = (data) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        data: data
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
} ;

export const signup = (data) => {
    return dispatch => {
        dispatch(signupStart());
        axios.post('/user/create', data)
            .then(response => {
                if(response.status === 200){
                    dispatch(signupSuccess(response.data));
                }else{
                    dispatch(signupFail('Request failed'));
                }
            }).catch(err => {
                dispatch(signupFail('Network error'));
            });
    };
};

export const authInitStart = () => {
    return {
        type: actionTypes.AUTH_INIT_START
    };
};

export const authInitSuccess = (token) => {
    return {
        type: actionTypes.AUTH_INIT_SUCCESS,
        token: token
    };
};

export const authInitFail = (error) => {
    return {
        type: actionTypes.ADD_DATA_FAIL,
        error: error
    };
};

export const authInit = (data) => {
    return dispatch => {
        dispatch(authInitStart());
        axios.post('/login', data)
            .then(response => {
                if(response.status === 200 && response.data){

                    const param = {
                        'token': response.data['token']
                    };
                   
                    localStorage.setItem('token', param['token']);
                    dispatch(authInitSuccess(param['token']));

                }else{
                    dispatch(authInitFail('Request failed'));
                }
            }).catch(err => {
                dispatch(authInitFail('Network error'));
            });

    };
}; 

export const setAuthRedirectionPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECTION_PATH,
        path: path
    };
};

export const logout = () => {
    localStorage.removeItem('Authorization');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout);
        }else{
            dispatch(authInitSuccess(token));
        }
    };
};