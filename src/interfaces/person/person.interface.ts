interface Images {
    jpg: Jpg,
}

interface Jpg {
    image_url: string,
}

export interface IPersonAnime {
    position: string,
    anime: Anime2,
}

interface Anime2 {
    mal_id: number,
    url: string,
    images: Images2,
    title: string,
}

interface Images2 {
    jpg: Jpg2,
    webp: Webp,
}

interface Jpg2 {
    image_url: string,
    small_image_url: string,
    large_image_url: string,
}

interface Webp {
    image_url: string,
    small_image_url: string,
    large_image_url: string,
}

export interface IVoice {
    role: string,
    anime: Anime3,
    character: Character,
}

interface Anime3 {
    mal_id: number,
    url: string,
    images: Images3,
    title: string,
}

interface Images3 {
    jpg: Jpg3,
    webp: Webp2,
}

interface Jpg3 {
    image_url: string,
    small_image_url: string,
    large_image_url: string,
}

interface Webp2 {
    image_url: string,
    small_image_url: string,
    large_image_url: string,
}

interface Character {
    mal_id: number,
    url: string,
    images: Images4,
    name: string,
}

interface Images4 {
    jpg: Jpg4,
    webp: Webp3,
}

interface Jpg4 {
    image_url: string,
}

interface Webp3 {
    image_url: string,
    small_image_url: string,
}

export interface IPerson {
    mal_id: number,
    url: string,
    website_url: any,
    images: Images,
    name: string,
    given_name: string,
    family_name: string,
    alternate_names: any[],
    birthday: string,
    favorites: number,
    about: string,
    anime: IPersonAnime[],
    manga: any[],
    voices: IVoice[],
}

export interface IPersonResponse {
    data: IPerson,
}
