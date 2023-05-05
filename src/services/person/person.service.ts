import {AxiosResp, axiosService_AnimeAPI} from "../axios.service";
import {IPersonResponse} from "../../interfaces";
import {urls} from "../../configs";

export const personService = {
    getFullById: (id: string): AxiosResp<IPersonResponse> => axiosService_AnimeAPI.get(`${urls.people}/${id}/full`),
}
