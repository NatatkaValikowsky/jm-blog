class RouteService{

    get mainRoute(){
        return `/`
    }

    get mainRouteLink(){
        return `/`
    }

    get articlesRoute(){
        return `/articles`
    }

    get articleRoute(){
        return `/articles/:slug`
    }

    articleLink(slug: string): string{
        return `/articles/${slug}`;
    }

    get editArticleRoute(){
        return `/articles/:slug/edit`
    }

    editArticleLink(slug: string): string {
        return `/articles/${slug}/edit`;
    }

    get signInRoute(){
        return `/sign-in`
    }

    get signInLink(){
        return `/sign-in`
    }

    get signUpRoute(){
        return `/sign-up`
    }

    get signUpLink(){
        return `/sign-up`
    }

    get profileRouter(){
        return `/profile`
    }

    get profileLink(){
        return `/profile`
    }

    get createArticleRoute(){
        return `/new-article`
    }

    get createArticleLink(){
        return `/new-article`
    }
}

export default new RouteService();