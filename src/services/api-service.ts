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

    getArticles(pageNum: number) : Promise<any> {
        const offset : number = (pageNum - 1) * this.articlesOnPage;
        return this.sendRequest(`${this.apiBase}/articles?limit=${this.articlesOnPage}&offset=${offset}`);
    }

    getArticle(slug: string) : Promise<any> {
        return this.sendRequest(`${this.apiBase}/articles/${slug}`);
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

}

export default new ApiService();