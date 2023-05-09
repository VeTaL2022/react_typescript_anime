import {AxiosResp, axiosService_NewsAPI} from "../axios.service";
import {INewsResponse} from "../../interfaces";
import {urls} from "../../configs";

export const newsService = {
    getAll: (q: string, safeSearch: string, setLang: string, sortBy: string, count: number, offset: number): AxiosResp<INewsResponse> => axiosService_NewsAPI.get(urls.search, {
        params: {
            q,
            safeSearch,
            setLang,
            sortBy,
            count,
            offset,
        }
    })
};
