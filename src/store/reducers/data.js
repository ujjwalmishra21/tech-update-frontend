import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    data: null,
    postData: null,
    loading: false,
    error: null
};

const addDataStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const addDataSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        data: action.data
    });
};

const addDataFail = (state, action) => {
    return {
        loading: false,
        error: action.error
    };
};

const fetchDataStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const fetchDataSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        data: action.data
    });
};

const fetchDataFail = (state, action) => {
    return {
        loading: false,
        error: action.error
    };
};

const fetchDataByIdStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const fetchDataByIdSuccess = (state, action) => {
    return{
        loading: false,
        postData: action.postData
    };
};

const fetchDataByIdFail = (state, action) => {
    return {
        loading: false,
        error: action.error
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_DATA_START:
            return addDataStart(state, action);
        case actionTypes.ADD_DATA_SUCCESS:
            return addDataSuccess(state, action);
        case actionTypes.ADD_DATA_FAIL:
            return addDataFail(state, action);
        case actionTypes.FETCH_DATA_START:
            return fetchDataStart(state, action);
        case actionTypes.FETCH_DATA_SUCCESS:
            return fetchDataSuccess(state, action);
        case actionTypes.FETCH_DATA_FAIL:
            return fetchDataFail(state, action);
        case actionTypes.FETCH_DATA_BY_ID_SUCCESS:
            return fetchDataByIdSuccess(state, action);
        case actionTypes.FETCH_DATA_BY_ID_START:
            return fetchDataByIdStart(state, action);
        case actionTypes.FETCH_DATA_BY_ID_FAIL:
            return fetchDataByIdFail(state, action);        
        default:
            return state;
    };
};

export default reducer;



