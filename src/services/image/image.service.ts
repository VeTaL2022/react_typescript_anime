import {AxiosResp, axiosService_ImageAPI} from "../axios.service";
import {ImageInterface} from "../../interfaces";
import {urls} from "../../configs";

export const imageService = {
    getByCategory: (category: string): AxiosResp<ImageInterface> => axiosService_ImageAPI.get(urls.single + '/' + category),
    getAllByCategory: (category: string): AxiosResp<ImageInterface> => axiosService_ImageAPI.post(urls.many + '/' + category, {data: ''}),
}
