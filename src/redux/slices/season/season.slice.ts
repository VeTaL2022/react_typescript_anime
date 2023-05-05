import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ISeasonResponse} from "../../../interfaces";
import {seasonService} from "../../../services";

interface IError {
    error: string,
}

interface IState {
    data: ISeasonResponse,
    loading: boolean,
    error: IError,
}

const initialState: IState = {
    data: {data: []},
    loading: false,
    error: {error: ''}
};

const getAll = createAsyncThunk<ISeasonResponse>(
    'seasonSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await seasonService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const seasonSlice = createSlice({
    name: 'seasonSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAll.fulfilled, (state, action: PayloadAction<ISeasonResponse>) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })
});

const {reducer: seasonReducer} = seasonSlice;

const seasonActions = {getAll};

export {seasonActions, seasonReducer};
