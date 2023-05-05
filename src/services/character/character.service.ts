import {AxiosResp, axiosService_AnimeAPI} from "../axios.service";
import {ICharacterResponse} from "../../interfaces";
import {urls} from "../../configs";

export const characterService = {
    getFullById: (id: string): AxiosResp<ICharacterResponse> => axiosService_AnimeAPI.get(`${urls.characters}/${id}/full`)
}
