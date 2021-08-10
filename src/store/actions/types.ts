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

export interface IUserData{
    bio: string | null,
    createdAt: string,
    email: string,
    id: number,
    image: string | null,
    token: string,
    updateAt: string,
    username: string
}

export type GetCurrentUserActionTypes = IGetCurrentUserActionStart | IGetCurrentUserActionSuccess;