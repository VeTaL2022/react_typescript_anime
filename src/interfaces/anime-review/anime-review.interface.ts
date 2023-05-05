interface Pagination {
    last_visible_page: number,
    has_next_page: boolean,
}

interface Reactions {
    overall: number
    nice: number
    love_it: number
    funny: number
    confusing: number
    informative: number
    well_written: number
    creative: number
}

interface Images {
    jpg: Jpg
    webp: Webp
}

interface Jpg {
    image_url: string,
    small_image_url?: string,
    large_image_url?: string,
}

interface Webp {
    image_url: string,
    small_image_url?: string,
    large_image_url?: string,
}

interface Entry {
    mal_id: number,
    url: string,
    images: Images,
    title: string
}

interface User {
    url: string
    username: string
    images: Images
}

export interface IAnimeReview {
    mal_id: number,
    url: string,
    type: string,
    reactions: Reactions,
    date: string,
    review: string,
    score: number,
    tags: string[],
    is_spoiler: boolean,
    is_preliminary: boolean,
    episodes_watched: number | null,
    entry: Entry,
    user: User,
}

export interface IAnimeReviewResponse {
    pagination: Pagination,
    data: IAnimeReview[],
}
