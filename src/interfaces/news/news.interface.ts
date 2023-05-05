interface Source {
    id: string;
    name: string;
}

export interface IArticle {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}

export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: IArticle[];
}
