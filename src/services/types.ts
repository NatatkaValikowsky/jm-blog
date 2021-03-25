export interface userData {
    username?: string,
    email: string,
    password?: string,
    bio?: string | null,
    image?:string | null
}

export interface  articleData {
    title: string,
    description: string,
    body: string,
    tagList: string[]
}

export interface requestData {
    method?: string,
    headers: any,
    body?:string
}