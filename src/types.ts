export interface IArticle {
    title: string,
    slug: string,
    author: {
        username: string,
        image: string
    },
    description: string,
    favoritesCount: number,
    createdAt: string,
    tagList: Array<string>,
    favorited?:boolean,
    body:string
}

export interface IArticle {
    title: string,
    slug: string,
    author: {
        username: string,
        image: string
    },
    description: string,
    favoritesCount: number,
    createdAt: string,
    tagList: Array<string>,
    favorited?:boolean,
    body:string
}

export interface ArticlesListProps {
    articles: Array<IArticle>
}

export interface IArticleFormInput {
    title: string,
    description: string,
    body: string,
    tags: Array<{
        id: number,
        value: string
    }>
}