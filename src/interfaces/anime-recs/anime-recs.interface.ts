interface Images {
    jpg: Jpg,
    webp: Webp,
}

interface Entry {
    mal_id: number,
    url: string,
    images: Images,
    title: string,
}

interface Jpg {
    image_url: string,
    small_image_url: string,
    large_image_url: string,
}

interface Webp {
    image_url: string,
    small_image_url: string,
    large_image_url: string,
}

interface User {
    url: string,
    username: string,
}

export interface IAnimeRecsPagination {
    last_visible_page: number,
    has_next_page: boolean,
}

export interface IAnimeRecs {
    mal_id: string,
    entry: Entry[],
    content: string,
    date: string,
    user: User,
}

export interface IAnimeRecsResponse {
    pagination: IAnimeRecsPagination,
    data: IAnimeRecs[],
    status: number,
    type: string,
    message: string,
}
