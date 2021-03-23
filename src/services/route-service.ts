class RouteService{

    get mainRoute(){
        return `/`
    }

    get articlesRoute(){
        return `/articles`
    }

    get articleRoute(){
        return `/articles/:slug`
    }

    get editArticleRoute(){
        return `/articles/:slug/edit`
    }

    get signInRoute(){
        return `/sign-in`
    }

    get signUpRoute(){
        return `/sign-up`
    }

    get profileRouter(){
        return `/profile`
    }

    get createArticleRoute(){
        return `/new-article`
    }
}

export default new RouteService();