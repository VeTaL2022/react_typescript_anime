interface Images {
    jpg: Jpg
    webp: Webp
}

interface Jpg {
    image_url: string
}

interface Webp {
    image_url: string
    small_image_url: string
}

interface Anime {
    role: string
    anime: Anime2
}

interface Anime2 {
    mal_id: number
    url: string
    images: Images2
    title: string
}

interface Images2 {
    jpg: Jpg2
    webp: Webp2
}

interface Jpg2 {
    image_url: string
    small_image_url: string
    large_image_url: string
}

interface Webp2 {
    image_url: string
    small_image_url: string
    large_image_url: string
}

interface Manga {
    role: string
    manga: Manga2
}

interface Manga2 {
    mal_id: number
    url: string
    images: Images3
    title: string
}

interface Images3 {
    jpg: Jpg3
    webp: Webp3
}

interface Jpg3 {
    image_url: string
    small_image_url: string
    large_image_url: string
}

interface Webp3 {
    image_url: string
    small_image_url: string
    large_image_url: string
}

interface Voice {
    person: Person
    language: string
}

interface Person {
    mal_id: number
    url: string
    images: Images4
    name: string
}

interface Images4 {
    jpg: Jpg4
}

interface Jpg4 {
    image_url: string
}

export interface ICharacter {
    mal_id: number
    url: string
    images: Images
    name: string
    name_kanji: string
    nicknames: any[]
    favorites: number
    about: string
    anime: Anime[]
    manga: Manga[]
    voices: Voice[]
}

export interface ICharacterResponse {
    data: ICharacter
}
