export interface IFormInput {
    username: string,
    email: string,
    password: string,
    ["repeat-password"]: string,
    agreement: boolean,
}

export interface IServerErrors{
    email: null | string[],
    username: null | string[]
}