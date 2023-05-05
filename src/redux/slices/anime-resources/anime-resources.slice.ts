import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAnimeCharacterResponse, IAnimeReviewResponse, IAnimeStaffResponse} from "../../../interfaces";
import {animeService} from "../../../services";

interface IError {
    error: string;
}

interface IState {
    characterData: IAnimeCharacterResponse,
    staffData: IAnimeStaffResponse,
    reviewData: IAnimeReviewResponse,
    loading: boolean,
    error: IError,
}

const initialState: IState = {
    characterData: {data: []},
    staffData: {data: []},
    reviewData: {data: [], pagination: {last_visible_page: 1, has_next_page: false}},
    loading: false,
    error: {error: ''},
};

const getCharacterData = createAsyncThunk<IAnimeCharacterResponse, { id: string }>(
    'animeResourcesSlice/getCharacterData',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await animeService.getCharactersById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getStaffData = createAsyncThunk<IAnimeStaffResponse, { id: string }>(
    'animeResourcesSlice/getStaffData',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await animeService.getStaffById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getReviewData = createAsyncThunk<IAnimeReviewResponse, { id: string }>(
    'animeResourcesSlice/getReviewData',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await animeService.getReviewsById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const animeResourcesSlice = createSlice({
    name: 'resourcesSlice',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder =>
        builder
            .addCase(getCharacterData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCharacterData.fulfilled, (state, action: PayloadAction<IAnimeCharacterResponse>) => {
                state.characterData = action.payload;
                state.loading = false;
            })
            .addCase(getCharacterData.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false
            })

            .addCase(getStaffData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStaffData.fulfilled, (state, action: PayloadAction<IAnimeStaffResponse>) => {
                state.staffData = action.payload;
                state.loading = false;
            })
            .addCase(getStaffData.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false
            })

            .addCase(getReviewData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReviewData.fulfilled, (state, action: PayloadAction<IAnimeReviewResponse>) => {
                state.reviewData = action.payload;
                state.loading = false;
            })
            .addCase(getReviewData.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false
            })
});

const {reducer: animeResourcesReducer, actions: {reset}} = animeResourcesSlice;

const animeResourcesActions = {getCharacterData, getStaffData, getReviewData, reset};

export {animeResourcesActions, animeResourcesReducer};
