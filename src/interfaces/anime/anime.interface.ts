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

interface Images {
    jpg: Jpg,
    webp: Webp,
}

interface Images2 {
    image_url: string,
    small_image_url: string,
    medium_image_url: string,
    large_image_url: string,
    maximum_image_url: string,
}

interface Trailer {
    youtube_id: string,
    url: string,
    embed_url: string,
    images: Images2,
}

interface Title {
    type: string,
    title: string,
}

interface From {
    day: number,
    month: number,
    year: number,
}

interface To {
    day: number | null,
    month: number | null,
    year: number | null,
}

interface Prop {
    from: From,
    to: To,
}

interface Aired {
    from: Date | number,
    to: Date | number | null,
    prop: Prop,
    string: string,
}

interface Broadcast {
    day: string | null,
    time: string | null,
    timezone: string | null,
    string: string | null,
}

interface Producer {
    mal_id: number,
    type: string,
    name: string,
    url: string,
}

interface Licensor {
    mal_id: number,
    type: string,
    name: string,
    url: string,
}

interface Studio {
    mal_id: number,
    type: string,
    name: string,
    url: string,
}

export interface IAnimeGenre {
    mal_id: number,
    type: string,
    name: string,
    url: string,
}

interface Theme {
    mal_id: number,
    type: string,
    name: string,
    url: string,
}

interface SongTheme {
    openings: string[],
    endings: string[],
}

interface Demographic {
    mal_id: number,
    type: string,
    name: string,
    url: string,
}

interface Relation {
    relation: string,
    entry: Entry[],
}

interface Entry {
    mal_id: number,
    type: string,
    name: string,
    url: string,
}

interface Streaming {
    name: string,
    url: string,
}

interface Items {
    count: number,
    total: number,
    per_page: number,
}

export interface IAnimePagination {
    last_visible_page: number,
    has_next_page: boolean,
    current_page: number,
    items: Items,
}

export interface IAnimeData {
    mal_id: number,
    url: string,
    images: Images,
    trailer: Trailer,
    approved: boolean,
    titles: Title[],
    title: string,
    title_english: string | null,
    title_japanese: string | null,
    title_synonyms: string[],
    type: string,
    source: string,
    episodes: number,
    status: string,
    airing: boolean,
    aired: Aired,
    duration: string,
    rating: string,
    score: number,
    scored_by: number,
    rank: number,
    popularity: number,
    members: number,
    favorites: number,
    synopsis: string,
    background?: any,
    season: string,
    year: number | null,
    broadcast: Broadcast,
    producers: Producer[],
    licensors: Licensor[],
    studios: Studio[],
    genres: IAnimeGenre[],
    explicit_genres: IAnimeGenre[],
    themes: Theme[],
    demographics: Demographic[],
    relations: Relation[],
    theme: SongTheme,
    external: any[],
    streaming: Streaming[]
}

export interface IAnime {
    data: IAnimeData,
}

export interface IAnimeResponse {
    pagination: IAnimePagination,
    data: IAnimeData[],
}
