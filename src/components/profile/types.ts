export interface ProfileProps{
    currUser: {
        username: string,
        email: string,
        bio: string | null,
        image: string | null
    },
    updateCurrentUser: (data: any) => void
};

export interface IFormInput {
    username?: string,
    email: string,
    password?: string,
    bio?: string | null,
    image?:string | null
}