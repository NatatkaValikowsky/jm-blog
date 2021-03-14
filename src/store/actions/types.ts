import {
    GET_CURRENT_USER_START,
    GET_CURRENT_USER_SUCCESS
} from "../constants";

interface IGetCurrentUserActionStart {
    type: typeof GET_CURRENT_USER_START,
    payload: null
}

interface IGetCurrentUserActionSuccess{
    type: typeof GET_CURRENT_USER_SUCCESS,
    payload: {
        username: string,
        email: string,
        bio: string | null,
        image: string | null
    }
}

export type GetCurrentUserActionTypes = IGetCurrentUserActionStart | IGetCurrentUserActionSuccess;