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

export const fetchData = (token) => {
    return dispatch => {
        dispatch(fetchDataStart());
        
        const config = {headers:{'Authorization': token}};
        
        axios.get('/data', config)
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

export const fetchDataById = (token, id) => {
    return dispatch => {
        dispatch(fetchDataByIdStart());
        
        const config = {headers:{'Authorization': token}};

        axios.get(`/data/${id}`,config)
            .then(response => {
               
                if(response.status === 200){
                    dispatch(fetchDataByIdSuccess(response.data));
                }else{
                    dispatch(fetchDataByIdFail('Request failed'))
                }
            }).catch(err => {
                dispatch(fetchDataByIdFail('Network error'));
            });
    };
};