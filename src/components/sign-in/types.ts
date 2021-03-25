export interface IFormInput {
    email: string,
    password: string,
}

export interface SignInProps{
    fetchCurrentUser: () => void,
}