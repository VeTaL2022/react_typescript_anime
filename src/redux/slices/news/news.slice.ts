import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IArticle, INewsResponse} from "../../../interfaces";
import {newsService} from "../../../services";

interface IError {
    error: string
}

interface IState {
    status: string,
    totalResults: number,
    articles: IArticle[],
    currentPage: number;
    loading: boolean,
    error: IError,
}

const initialState: IState = {
    status: '',
    totalResults: 0,
    articles: [],
    currentPage: 1,
    loading: false,
    error: {error: ''},
}

const getAll = createAsyncThunk<INewsResponse, { q: string, lang: string, sort_by: string, page: number, page_size: number, search_in: string }>(
    'newsSlice/getAll',
    async ({q, lang, sort_by, page, page_size, search_in}, {rejectWithValue}) => {
        try {
            const {data} = await newsService.getAll(q, lang, sort_by, page, page_size, search_in);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const newsSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {
        reset: () => initialState,
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAll.fulfilled, (state, action: PayloadAction<INewsResponse>) => {
                state.status = action.payload.status;
                state.articles = [...state.articles, ...action.payload.articles];
                state.totalResults = action.payload.total_hits;
                state.loading = false;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })
});

const {reducer: newsReducer, actions: {reset, setCurrentPage}} = newsSlice;

const newsActions = {getAll, reset, setCurrentPage};

export {newsActions, newsReducer};
