import axios, {AxiosResponse} from "axios";

import {AnimeAPI_URL, ImageAPI_URL, NewsAPI_URL, QuoteAPI_URL, RapidAPI_News_URL} from "../configs";

export type AxiosResp<T> = Promise<AxiosResponse<T>>

export const axiosService_AnimeAPI = axios.create({baseURL: AnimeAPI_URL});

export const axiosService_ImageAPI = axios.create({baseURL: ImageAPI_URL});

export const axiosService_QuoteAPI = axios.create({baseURL: QuoteAPI_URL});

export const axiosService_NewsAPI = axios.create({baseURL: NewsAPI_URL});

axiosService_NewsAPI.interceptors.request.use(config => {
    config.headers['Ocp-Apim-Subscription-Key'] = import.meta.env.VITE_NEWS_API_KEY;
    return config;
});

export const axiosService_RapidAPI_News = axios.create({baseURL: RapidAPI_News_URL});

const rapidHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY as string,
    'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST as string
};

axiosService_RapidAPI_News.interceptors.request.use(config => {
    config.headers = Object.assign({}, config.headers, rapidHeaders);
    return config;
})

