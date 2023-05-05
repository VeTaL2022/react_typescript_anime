import {AxiosResp, axiosService_QuoteAPI} from "../axios.service";
import {IQuote} from "../../interfaces";
import {urls} from "../../configs";

export const quoteService = {
    getRandom: (): AxiosResp<IQuote> => axiosService_QuoteAPI.get(urls.random), // 1
    getAllRandom: (): AxiosResp<IQuote[]> => axiosService_QuoteAPI.get(urls.quotes), // 10
    getAllByTitle: (title: string, page: number): AxiosResp<IQuote[]> => axiosService_QuoteAPI.get(`${urls.quotes}/anime?`, {
        params: {
            title,
            page
        }
    }), // 10
    getAllByCharacter: (name: string, page: number): AxiosResp<IQuote[]> => axiosService_QuoteAPI.get(`${urls.quotes}/character?`, {
        params: {
            name,
            page
        }
    }) // 10
}
