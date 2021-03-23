interface userData {
    username?: string,
    email: string,
    password?: string,
    bio?: string | null,
    image?:string | null
}

interface  articleData {
    title: string,
    description: string,
    body: string,
    tagList: string[]
}

interface requestData {
    method?: string,
    headers: any,
    body?:string
}

type valueType = {user:userData} | {article:articleData} | null

class ApiService {
    apiBase = 'https://conduit.productionready.io/api';
    apiKey = '1a312659d57cbdc19acab57a112fc99f';

    public articlesOnPage = 5;

    private apiToken : string | undefined = undefined;

    set token(token: string){
        this.apiToken = token;
    }

    async sendRequest(url: string, value? : valueType, token?: string, method?: string): Promise<any> {

        const headers  = new Headers({'Content-Type': 'application/json;charset=utf-8'});

        if(token) headers.append('Authorization', `Token ${token}`);

        const sendData:requestData = value
            ? {
                method: 'post',
                headers: headers,
                body: JSON.stringify(value),
            }
            : {
                method: 'get',
                headers: headers
            };

        if(method) sendData.method = method;

        try {
            const res = await fetch(url, sendData);
            return await res.json();
        } catch (error) {
            throw new Error(`Could not connect to API`);
        }
    }

    getArticles(pageNum: number) : Promise<any> {
        const offset : number = (pageNum - 1) * this.articlesOnPage;
        return this.sendRequest(`${this.apiBase}/articles?limit=${this.articlesOnPage}&offset=${offset}`, null, this.apiToken);
    }

    getArticle(slug: string) : Promise<any> {
        return this.sendRequest(`${this.apiBase}/articles/${slug}`, null, this.apiToken);
    }

    createUser(data: userData){
        return this.sendRequest(`${this.apiBase}/users`, {
            user: data
        }, undefined, 'post');
    }

    loginUser(data:userData){
        return this.sendRequest(`${this.apiBase}/users/login`, {
            user: data
        });
    }

    getCurrentUser(){
        return this.sendRequest(`${this.apiBase}/user`, null, this.apiToken);
    }

    updateUserData(data: userData){
        return this.sendRequest(`${this.apiBase}/user`, {user: data}, this.apiToken, 'put')
    }

    createArticle(data: articleData){
        return this.sendRequest(`${this.apiBase}/articles`, {article: data}, this.apiToken);
    }

    updateArticle(data: articleData, slug: string) {
        return this.sendRequest(`${this.apiBase}/articles/${slug}`, {article: data}, this.apiToken, 'put');
    }

    deleteArticle(slug:string){
        return this.sendRequest(`${this.apiBase}/articles/${slug}`, null, this.apiToken, 'delete');
    }

    favouriteArticle(slug: string){
        return this.sendRequest(`${this.apiBase}/articles/${slug}/favorite`, null, this.apiToken, 'post');
    }

    unfavouriteArticle(slug: string){
        return this.sendRequest(`${this.apiBase}/articles/${slug}/favorite`, null, this.apiToken, 'delete');
    }
}

export default new ApiService();