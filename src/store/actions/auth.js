import { ContactSupportOutlined } from '@material-ui/icons';
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

export const authInitSuccess = (data) => {
    return {
        type: actionTypes.AUTH_INIT_SUCCESS,
        token: data['token'],
        username: data['username']
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
                        'token': response.data['token'],
                        'username': response.data['username']
                    };
                   
                    localStorage.setItem('token', param['token']);
                    localStorage.setItem('username', param['username']);
                    dispatch(authInitSuccess(param));

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
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const data = {
            token: token,
            username: username
        }
        
        if(!data['token']){
            dispatch(logout);
        }else{
            dispatch(authInitSuccess(data));
        }
    };
};