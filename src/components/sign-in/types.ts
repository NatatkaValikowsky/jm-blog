export interface IFormInput {
    email: string,
    password: string,
}

export interface SignInProps{
    fetchCurrentUser: (userData: any) => void,
}