import {AxiosResp, axiosService_NewsAPI} from "../axios.service";
import {INewsResponse} from "../../interfaces";
import {urls} from "../../configs";

export const newsService = {
    getAll: (q: string, lang: string, sort_by: string, page: number, page_size: number, search_in: string): AxiosResp<INewsResponse> => axiosService_NewsAPI.get(urls.search, {
        params: {
            q,
            lang,
            sort_by,
            page,
            page_size,
            search_in,
        }
    })
}
