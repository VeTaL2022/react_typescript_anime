import {AxiosResp, axiosService_AnimeAPI} from "../axios.service";
import {IProducerResponse} from "../../interfaces";
import {urls} from "../../configs";

export const producerService = {
    getAll: (order_by: string, sort: string, page: number, limit: number): AxiosResp<IProducerResponse> => axiosService_AnimeAPI.get(urls.producers, {
        params: {
            order_by,
            sort,
            page,
            limit
        }
    }),
}
