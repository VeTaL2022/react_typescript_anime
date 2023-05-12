import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {INews, INewsResponse} from "../../../interfaces";
import {newsService} from "../../../services";

interface IError {
    error: { code: number, message: string }
}

interface IState {
    totalResults: number,
    news: INews[],
    offset: number,
    loading: boolean,
    error: IError,
}

const initialState: IState = {
    totalResults: 0,
    news: [],
    offset: 5,
    loading: false,
    error: {error: {code: 0, message: ''}},
}

const getAll = createAsyncThunk<INewsResponse, { q: string, safeSearch: string, setLang: string, sortBy: string, count: number, offset: number, freshness: string }>(
    'newsSlice/getAll',
    async ({q, safeSearch, setLang, sortBy, count, offset, freshness}, {rejectWithValue}) => {
        try {
            const {data} = await newsService.getAll(q, safeSearch, setLang, sortBy, count, offset, freshness);
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
        setOffSet: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAll.fulfilled, (state, action: PayloadAction<INewsResponse>) => {
                state.news = [...state.news, ...action.payload.value];
                state.totalResults = action.payload.totalEstimatedMatches;
                state.loading = false;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })
});

const {reducer: newsReducer, actions: {reset, setOffSet}} = newsSlice;
const newsActions = {getAll, reset, setOffSet};

export {newsActions, newsReducer};
