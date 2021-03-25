export interface EditArticleProps{
    currUser: {
        username: string,
        email: string,
        bio: string | null,
        image: string | null
    }
}

export interface ParamTypes {
    slug: string
}