export interface IUserInput {
    q: string,
    search_in: string[],
    lang: null | string,
    not_lang: null | string,
    countries: null | string,
    not_countries: null | string,
    from: string,
    to: null | string,
    ranked_only: string,
    from_rank: null | number,
    to_rank: null | number,
    sort_by: string,
    page: number,
    size: number,
    sources: null | string,
    not_sources: any[],
    topic: null | string,
    published_date_precision: null | string,
}

export interface IArticle {
    title: string,
    author: string,
    published_date: string,
    published_date_precision: string,
    link: string,
    clean_url: string,
    excerpt: string,
    summary: string,
    rights: string,
    rank: number,
    topic: string,
    country: string,
    language: string,
    authors: string,
    media: string,
    is_opinion: boolean,
    twitter_account: string,
    _score: number,
    _id: string,
}

export interface INewsResponse {
    status: string;
    total_hits: number;
    page: number,
    total_pages: number,
    page_size: number,
    articles: IArticle[],
    user_input: IUserInput,
}
