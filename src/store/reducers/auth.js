import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState= {
    token: null,
    error: null,
    data: null,
    loading: false,
    authRedirectPath: '/'
};

const signupStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const signupFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
}

const signupSuccess = (state, action) => {
    return updateObject(state, { loading: false, data: action.error });
}

const authInitStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authInitFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
};

const authInitSuccess = (state, action) => {
    return updateObject(state, { loading: false, token: action.token })
};

const authLogout = (state, action) => {
    return updateObject(state, { loading: false, token: null, error: null, data: null })
};

const setAuthRedirectionPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
};

const reducer =  (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGNUP_START:
            return signupStart(state, action);
        case actionTypes.SIGNUP_FAIL:
            return signupFail(state, action);
        case actionTypes.SIGNUP_SUCCESS:
            return signupSuccess(state, action);
        case actionTypes.AUTH_INIT_START:
            return authInitStart(state, action);
        case actionTypes.AUTH_INIT_FAIL:
            return authInitStart(state, action);
        case actionTypes.AUTH_INIT_SUCCESS:
            return authInitSuccess(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECTION_PATH:
            return setAuthRedirectionPath(state, action);
        default:
            return state
    }
};

export default reducer;