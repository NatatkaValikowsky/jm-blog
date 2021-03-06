class ApiService {
    apiBase = 'https://conduit.productionready.io/api';

    apiKey = '1a312659d57cbdc19acab57a112fc99f';

    public articlesOnPage = 5;

    async sendRequest(url: string, value?: any): Promise<any> {
        const sendData = value
            ? {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    value,
                }),
            }
            : {};
        try {
            const res = await fetch(url, sendData);
            return await res.json();
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
}

export default new ApiService();