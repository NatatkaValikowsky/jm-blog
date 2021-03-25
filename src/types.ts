export interface ArticleInterface {
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
    articles: Array<ArticleInterface>
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