import {AxiosResp, axiosService_AnimeAPI} from "../axios.service";
import {ISeasonResponse} from "../../interfaces";
import {urls} from "../../configs";

export const seasonService = {
    getAll: (): AxiosResp<ISeasonResponse> => axiosService_AnimeAPI.get(urls.seasons),
}
