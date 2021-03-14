export interface IAppState{
    currUserInfo: {
        email: string,
        username: string,
        image: string | null,
        bio: string | null
    }
}

export interface ICurrUserInfo{
    email: string,
    username: string,
    image: string | null,
    bio: string | null
}