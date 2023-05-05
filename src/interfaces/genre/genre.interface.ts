export interface IGenre {
    mal_id: number,
    name: string,
    url: string,
    count: number,
}

export interface IGenreResponse {
    data: IGenre[]
}
