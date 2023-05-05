import {
    IAnime,
    IAnimeCharacterResponse,
    IAnimeRecsResponse,
    IAnimeResponse,
    IAnimeReviewResponse,
    IAnimeStaffResponse
} from "../../interfaces";
import {AxiosResp, axiosService_AnimeAPI} from "../axios.service";
import {urls} from "../../configs";

export const animeService = {
    getAll: (order_by: string, sort: string, genres: string, producers: string, page: number, limit: number, sfw: boolean): AxiosResp<IAnimeResponse> => axiosService_AnimeAPI.get(urls.anime, {
        params: {
            order_by,
            sort,
            genres,
            producers,
            page,
            limit,
            sfw,
        }
    }),
    getTop: (type: string, filter: string, page: number, limit: number): AxiosResp<IAnimeResponse> => axiosService_AnimeAPI.get(urls.top_anime, {
        params: {
            type,
            filter,
            page,
            limit
        }
    }),
    getAllByName: (q: string, page: number, limit: number, sfw: boolean): AxiosResp<IAnimeResponse> => axiosService_AnimeAPI.get(urls.anime, {
        params: {
            q,
            page,
            limit,
            sfw,
        }
    }),
    getAllBySeason: (year: number, season: string, page: number): AxiosResp<IAnimeResponse> => axiosService_AnimeAPI.get(`${urls.seasons}/${year}/${season}`, {params: {page}}),
    getRecommendations: (page: number): AxiosResp<IAnimeRecsResponse> => axiosService_AnimeAPI.get(`${urls.recommendations}/anime`, {params: {page}}),
    getRecentReviews: (): AxiosResp<IAnimeReviewResponse> => axiosService_AnimeAPI.get(urls.reviews),
    getFullById: (id: string): AxiosResp<IAnime> => axiosService_AnimeAPI.get(`${urls.anime}/${id}/full`),
    getStaffById: (id: string): AxiosResp<IAnimeStaffResponse> => axiosService_AnimeAPI.get(`${urls.anime}/${id}/staff`),
    getCharactersById: (id: string): AxiosResp<IAnimeCharacterResponse> => axiosService_AnimeAPI.get(`${urls.anime}/${id}/characters`),
    getReviewsById: (id: string): AxiosResp<IAnimeReviewResponse> => axiosService_AnimeAPI.get(`${urls.anime}/${id}/reviews`),
}
