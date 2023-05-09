interface IQueryContext {
    originalQuery: string,
    adultIntent: boolean,
}

interface ISort {
    name: string,
    id: string,
    isSelected: boolean,
    url: string,
}

interface IProvider {
    _type: string,
    name: string,
    image?: Image,
}

interface Image {
    thumbnail: IThumbnail,
}

interface IThumbnail {
    contentUrl: string,
}

interface Image2 {
    thumbnail: IThumbnail2,
}

interface IThumbnail2 {
    contentUrl: string,
    width: number,
    height: number,
}

interface IAbout {
    readLink: string,
    name: string,
}

export interface INews {
    name: string,
    url: string,
    description: string,
    provider: IProvider[],
    datePublished: string,
    image?: Image2,
    about?: IAbout[],
}

export interface INewsResponse {
    _type: string,
    readLink: string,
    queryContext: IQueryContext,
    totalEstimatedMatches: number,
    sort: ISort[],
    value: INews[],
}
