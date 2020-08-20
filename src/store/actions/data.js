import axios from './../../axios-order';
import * as actionTypes from './actionTypes';

export const addDataFail = (error) => {
    return {
        type: actionTypes.ADD_DATA_FAIL,
        error: error
    };
};

export const addDataStart = () => {
    return {
        type: actionTypes.ADD_DATA_START
    };
};

export const addDataSuccess = (data) => {
    return {
        type: actionTypes.ADD_DATA_SUCCESS,
        data: data
    };
};

export const addData = (data) => {
    return dispatch => {
        dispatch(addDataStart());

        axios.post('/data/add-data', data)
            .then(response => {
                if(response.status === 200){
                    dispatch(addDataSuccess(response.data));
                }else{
                    dispatch(addDataFail('Request failed'));
                }
            }).catch(err => {
                dispatch(addDataFail('Network error'));
            });
    };
};

export const fetchDataFail = (error) => {
    return {
        type: actionTypes.FETCH_DATA_FAIL,
        error: error
    };
};

export const fetchDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        data: data 
    };
};

export const fetchDataStart = () => {
    return {
        type: actionTypes.FETCH_DATA_START
    };
};

export const fetchData = () => {
    return dispatch => {
        dispatch(fetchDataStart());

        axios.get('/data')
            .then(response => {
                if(response.status === 200){
                    dispatch(fetchDataSuccess(response.data));
                }else{
                    dispatch(fetchDataFail('Request failed'))
                }
            }).catch(err => {
                dispatch(fetchDataFail('Network error'));
            });
    };
};

export const fetchDataByIdFail = (error) => {
    return {
        type: actionTypes.FETCH_DATA_BY_ID_FAIL,
        error: error
    };
};

export const fetchDataByIdStart = () => {
    return {
        type: actionTypes.FETCH_DATA_BY_ID_START
    };
};

export const fetchDataByIdSuccess = (postData) => {
    return {
      type: actionTypes.FETCH_DATA_BY_ID_SUCCESS,
      postData: postData
    };
};

export const fetchDataById = (id) => {
    return dispatch => {
        dispatch(fetchDataByIdStart());
        axios.get(`/data/${id}`)
            .then(response => {
                if(response.status === 200){
                    dispatch(fetchDataSuccess(response.data));
                }else{
                    dispatch(fetchDataByIdFail('Request failed'))
                }
            }).catch(err => {
                dispatch(fetchDataByIdFail('Network error'));
            });
    };
};