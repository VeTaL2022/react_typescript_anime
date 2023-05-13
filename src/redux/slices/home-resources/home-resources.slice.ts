import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAnimeRecsResponse, IAnimeReviewResponse} from "../../../interfaces";
import {animeService} from "../../../services";

interface IError {
    error: string;
}

interface IState {
    reviewData: IAnimeReviewResponse,
    reviewExpand: boolean[],

    recsData: IAnimeRecsResponse,
    recsPage: number,

    loading: boolean,
    error: IError
}

const initialState: IState = {
    reviewData: {
        data: [],
        pagination: {last_visible_page: 1, has_next_page: true},
        status: 0,
        message: '',
        report_url: ''
    },
    reviewExpand: [],

    recsData: {data: [], pagination: {last_visible_page: 1, has_next_page: true}, status: 0, type: '', message: ''},
    recsPage: 1,

    loading: false,
    error: {error: ''}
};

const getReviewData = createAsyncThunk<IAnimeReviewResponse>(
    'homeResourcesSlice/getReviewData',
    async (_, {rejectWithValue}) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const {data} = await animeService.getRecentReviews();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getRecsData = createAsyncThunk<IAnimeRecsResponse, { page: number }>(
    'homeResourcesSlice/getRecsData',
    async ({page}, {rejectWithValue}) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const {data} = await animeService.getRecommendations(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const homeResourcesSlice = createSlice({
    name: 'resourcesSlice',
    initialState,
    reducers: {
        toggleExpand: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.reviewExpand[index] = !state.reviewExpand[index];
        },
        setRecsPage: (state, action: PayloadAction<number>) => {
            state.recsPage = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getReviewData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReviewData.fulfilled, (state, action: PayloadAction<IAnimeReviewResponse>) => {
                state.reviewData = action.payload;
                state.loading = false;
            })
            .addCase(getReviewData.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })

            .addCase(getRecsData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecsData.fulfilled, (state, action: PayloadAction<IAnimeRecsResponse>) => {
                state.recsData = action.payload;
                state.loading = false;
            })
            .addCase(getRecsData.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })
});

const {reducer: homeResourcesReducer, actions: {toggleExpand, setRecsPage}} = homeResourcesSlice;

const homeResourcesActions = {getReviewData, getRecsData, toggleExpand, setRecsPage};

export {homeResourcesActions, homeResourcesReducer};
