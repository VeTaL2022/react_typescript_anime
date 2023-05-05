interface Items {
    count: number,
    total: number,
    per_page: number,
}

interface Title {
    type: string,
    title: string,
}

export interface Jpg {
    image_url: string,
}

export interface Images {
    jpg: Jpg,
}

export interface IProducerPagination {
    last_visible_page: number,
    has_next_page: boolean,
    current_page: number,
    items: Items,
}

export interface IProducer {
    mal_id: number,
    url: string,
    titles: Title[],
    images: Images,
    favorites: number,
    established: Date | string | null,
    about: string | null,
    count: number,
}

export interface IProducerResponse {
    pagination: IProducerPagination,
    data: IProducer[],
}
