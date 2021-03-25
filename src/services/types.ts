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

export interface ArticleDTO{
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: Array<string>,
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    }
}

export type ArticleListDTO = {
    articles: Array<ArticleDTO>,
    articlesCount: number
};

export interface ArticleRecDTO {
    article: ArticleDTO;
}

export interface UserDTO {
    user?: {
        email: string,
        token: string,
        username: string,
        bio: null | string,
        image: null | string
    },
    errors?:{
        email: Array<string>,
        username: Array<string>
    }
}