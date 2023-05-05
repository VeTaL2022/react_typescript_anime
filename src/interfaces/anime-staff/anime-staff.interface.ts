interface Jpg {
    image_url: string,
}

interface Images {
    jpg: Jpg,
}

interface Person {
    mal_id: number,
    url: string,
    images: Images,
    name: string,
}

export interface IAnimeStaffPerson {
    person: Person,
    positions: string[],
}

export interface IAnimeStaffResponse {
    data: IAnimeStaffPerson[],
}

