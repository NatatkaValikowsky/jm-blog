export interface IAppState{
    currUserInfo: {
        email: string,
        username: string,
        image: string | null,
        bio: string | null
    }
}

export interface IUserInfo{
    email: string,
    username: string,
    image?: string | null,
    bio?: string | null,
    password?: string | null
}