import { Dispatch } from 'redux';
import ApiService from '../../services/api-service';

import {
    GET_CURRENT_USER_START,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAILURE,
    REMOVE_CURRENT_USER,
    UPDATE_CURRENT_USER
} from "../constants";

export const fetchCurrentUser = (token:string) => async (dispatch : Dispatch) => {
    dispatch({type: GET_CURRENT_USER_START});

    ApiService.getCurrentUser(token)
        .then(data => {
            if(data.user){
                dispatch({
                    type: GET_CURRENT_USER_SUCCESS,
                    payload: data.user
                });
            }
        })
        .catch(error => {
            dispatch({
                type: GET_CURRENT_USER_FAILURE
            });
        });
}

export const updateCurrentUser = (data: {
    user: {
        email: string,
        username: string,
        password?: string,
        bio? :string | null,
        image? : string | null
    }
}) => (dispatch: Dispatch) => {
    dispatch({
        type: UPDATE_CURRENT_USER,
        payload: data.user
    });
}

export const removeCurrentUser = () => (dispatch: Dispatch) => {
    dispatch({
        type:REMOVE_CURRENT_USER
    });
}