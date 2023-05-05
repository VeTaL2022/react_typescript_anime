import axios, {AxiosResponse} from "axios";

import {AnimeAPI_URL, NewsAPI_URL, QuoteAPI_URL, ImageAPI_URL} from "../configs";


export type AxiosResp<T> = Promise<AxiosResponse<T>>

export const axiosService_AnimeAPI = axios.create({baseURL: AnimeAPI_URL});

export const axiosService_ImageAPI = axios.create({baseURL: ImageAPI_URL});

export const axiosService_QuoteAPI = axios.create({baseURL: QuoteAPI_URL});

export const axiosService_NewsAPI = axios.create({baseURL: NewsAPI_URL});
