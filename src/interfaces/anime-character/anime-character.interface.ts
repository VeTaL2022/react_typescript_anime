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

interface VoiceActor {
    person: Person
    language: string
}

interface Images2 {
    jpg: Jpg2
}

interface Jpg2 {
    image_url: string
}

interface Person {
    mal_id: number
    url: string
    images: Images2
    name: string
}

interface Character {
    mal_id: number
    url: string
    images: Images
    name: string
}

export interface IAnimeCharacter {
    character: Character
    role: string
    favorites: number
    voice_actors: VoiceActor[]
}

export interface IAnimeCharacterResponse {
    data: IAnimeCharacter[]
}
