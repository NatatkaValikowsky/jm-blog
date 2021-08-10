import {
    userData,
    articleData,
    requestData,
    ArticleListDTO,
    UserDTO,
    ArticleRecDTO
} from './types';

type valueType = {user:userData} | {article:articleData} | null

class ApiService {
    apiBase = process.env.REACT_APP_API_BASE;
    apiKey = process.env.REACT_APP_API_KEY;

    public articlesOnPage = 5;

    private apiToken : string | undefined = undefined;

    set token(token: string){
        this.apiToken = token;
    }

    async sendRequest<T>(url: string, value? : valueType, token?: string, method?: string): Promise<T> {

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

    getArticles(pageNum: number) : Promise<ArticleListDTO> {
        const offset : number = (pageNum - 1) * this.articlesOnPage;
        return this.sendRequest(`${this.apiBase}/articles?limit=${this.articlesOnPage}&offset=${offset}`, null, this.apiToken);
    }

    getArticle(slug: string) : Promise<ArticleRecDTO> {
        return this.sendRequest(`${this.apiBase}/articles/${slug}`, null, this.apiToken);
    }

    createUser(data: userData) : Promise<UserDTO>{
        return this.sendRequest(`${this.apiBase}/users`, {
            user: data
        }, undefined, 'post');
    }

    loginUser(data:userData) : Promise<UserDTO>{
        return this.sendRequest(`${this.apiBase}/users/login`, {
            user: data
        });
    }

    getCurrentUser() : Promise<UserDTO>{
        return this.sendRequest(`${this.apiBase}/user`, null, this.apiToken);
    }

    updateUserData(data: userData) : Promise<UserDTO>{
        return this.sendRequest(`${this.apiBase}/user`, {user: data}, this.apiToken, 'put')
    }

    createArticle(data: articleData) : Promise<ArticleRecDTO>{
        return this.sendRequest(`${this.apiBase}/articles`, {article: data}, this.apiToken);
    }

    updateArticle(data: articleData, slug: string) : Promise<ArticleRecDTO> {
        return this.sendRequest(`${this.apiBase}/articles/${slug}`, {article: data}, this.apiToken, 'put');
    }

    deleteArticle(slug:string) : Promise<Object>{
        return this.sendRequest(`${this.apiBase}/articles/${slug}`, null, this.apiToken, 'delete');
    }

    favouriteArticle(slug: string) : Promise<ArticleRecDTO>{
        return this.sendRequest(`${this.apiBase}/articles/${slug}/favorite`, null, this.apiToken, 'post');
    }

    unfavouriteArticle(slug: string) : Promise<ArticleRecDTO>{
        return this.sendRequest(`${this.apiBase}/articles/${slug}/favorite`, null, this.apiToken, 'delete');
    }
}

export default new ApiService();