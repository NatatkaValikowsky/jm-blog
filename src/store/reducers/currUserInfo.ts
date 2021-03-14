import {GetCurrentUserActionTypes} from "../actions/types";
import {
    GET_CURRENT_USER_SUCCESS,
    REMOVE_CURRENT_USER,
    UPDATE_CURRENT_USER
} from "../constants";

const initialState = null;

export default (state = initialState, action: GetCurrentUserActionTypes) => {
    switch (action.type) {
        case GET_CURRENT_USER_SUCCESS:
            return action.payload;
        case REMOVE_CURRENT_USER:
            return initialState;
        case UPDATE_CURRENT_USER:
            return action.payload;
        default:
            return state;
    }
}