import axios, {AxiosResponse} from "axios";

import {AnimeAPI_URL, ImageAPI_URL, NewsAPI_URL, QuoteAPI_URL} from "../configs";

export type AxiosResp<T> = Promise<AxiosResponse<T>>

export const axiosService_AnimeAPI = axios.create({baseURL: AnimeAPI_URL});

export const axiosService_ImageAPI = axios.create({baseURL: ImageAPI_URL});

export const axiosService_QuoteAPI = axios.create({baseURL: QuoteAPI_URL});

export const axiosService_NewsAPI = axios.create({baseURL: NewsAPI_URL});

axiosService_NewsAPI.interceptors.request.use(config => {
    config.headers['Ocp-Apim-Subscription-Key'] = import.meta.env.VITE_NEWS_API_KEY;
    return config;
});
