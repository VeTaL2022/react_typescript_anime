import {AxiosResp, axiosService_NewsAPI} from "../axios.service";
import {INewsResponse} from "../../interfaces";
import {urls} from "../../configs";

export const newsService = {
    getAll: (q: string, language: string, sortBy: string, page: number, pageSize: number, searchIn: string, apiKey: string): AxiosResp<INewsResponse> => axiosService_NewsAPI.get(urls.everything, {
        params: {
            q,
            language,
            sortBy,
            page,
            pageSize,
            searchIn,
            apiKey,
        }
    })
}
