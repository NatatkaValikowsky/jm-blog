export interface CreateArticleProps{
    currUser: {
        username: string,
        email: string,
        bio: string | null,
        image: string | null
    }
}

export interface IFormInput {
    title: string,
    description: string,
    body: string,
    tags: Array<{
        id: number,
        value: string
    }>
}