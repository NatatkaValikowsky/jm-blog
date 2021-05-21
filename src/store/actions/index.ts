import { Dispatch } from 'redux';
import ApiService from '../../services/api-service';
import { IUserInfo } from '../types';

import {
    GET_CURRENT_USER_START,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAILURE,
    REMOVE_CURRENT_USER,
    UPDATE_CURRENT_USER
} from "../constants";

export const fetchCurrentUser = (userData ? : any) => async (dispatch : Dispatch) => {
    dispatch({type: GET_CURRENT_USER_START});

    if(userData){
        dispatch({
            type: GET_CURRENT_USER_SUCCESS,
            payload: userData
        });
    } else{
        ApiService.getCurrentUser()
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
}

export const updateCurrentUser = (data: {
    user: IUserInfo
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