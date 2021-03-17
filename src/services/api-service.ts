interface userData {
    username?: string,
    email: string,
    password: string
}

interface requestData {
    method?: string,
    headers: any,
    body?:string
}

class ApiService {
    apiBase = 'https://conduit.productionready.io/api';
    apiKey = '1a312659d57cbdc19acab57a112fc99f';

    public articlesOnPage = 5;

    async sendRequest(url: string, value?: any, token?: string, method?: string): Promise<any> {

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
            if(res.ok){
                return await res.json();
            }
        } catch (error) {
            throw new Error(`Could not connect to API`);
        }
    }

    getArticles(pageNum: number, token: string) : Promise<any> {
        const offset : number = (pageNum - 1) * this.articlesOnPage;
        return this.sendRequest(`${this.apiBase}/articles?limit=${this.articlesOnPage}&offset=${offset}`, null, token);
    }

    getArticle(slug: string, token: string) : Promise<any> {
        return this.sendRequest(`${this.apiBase}/articles/${slug}`, null, token);
    }

    createUser(data: userData){
        return this.sendRequest(`${this.apiBase}/users`, {
            user: data
        });
    }

    loginUser(data:userData){
        return this.sendRequest(`${this.apiBase}/users/login`, {
            user: data
        });
    }

    getCurrentUser(token: string){
        return this.sendRequest(`${this.apiBase}/user`, false, token);
    }

    updateUserData(data: {
        username: string,
        email: string,
        password?: string,
        image?: string}, token:string){
        return this.sendRequest(`${this.apiBase}/user`, {user: data}, token, 'put')
    }

    createArticle(data: {
        title: string,
        description: string,
        body: string,
        tagList: string[]
    }, token: string){
        return this.sendRequest(`${this.apiBase}/articles`, {article: data}, token);
    }

    updateArticle(data: {
        title: string,
        description: string,
        body: string,
        tagList: string[]
    }, token: string, slug: string) {
        return this.sendRequest(`${this.apiBase}/articles/${slug}`, {article: data}, token, 'put');
    }

    deleteArticle(slug:string, token:string){
        return this.sendRequest(`${this.apiBase}/articles/${slug}`, null, token, 'delete');
    }

    favouriteArticle(slug: string, token: string){
        return this.sendRequest(`${this.apiBase}/articles/${slug}/favorite`, null, token, 'post');
    }

    unfavouriteArticle(slug: string, token: string){
        return this.sendRequest(`${this.apiBase}/articles/${slug}/favorite`, null, token, 'delete');
    }
}

export default new ApiService();