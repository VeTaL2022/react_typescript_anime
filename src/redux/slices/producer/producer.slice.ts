import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IProducer, IProducerResponse, IProducerPagination} from "../../../interfaces";
import {producerService} from "../../../services";

interface IError {
    error: string
}

interface IState {
    data: IProducer[],
    pagination: IProducerPagination,
    loading: boolean,
    error: IError
}

const initialState: IState = {
    pagination: {
        last_visible_page: 0,
        has_next_page: true,
        current_page: 0,
        items: {per_page: 0, count: 0, total: 0}
    },
    data: [],
    loading: false,
    error: {error: ''}
}

const getAll = createAsyncThunk<IProducerResponse, { order_by: string, sort: string, page: number, limit: number }>(
    'producerSlice/getAll',
    async ({order_by, sort, page, limit}, {rejectWithValue}) => {
        try {
            const {data} = await producerService.getAll(order_by, sort, page, limit);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const producerSlice = createSlice({
    name: 'producerSlice',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAll.fulfilled, (state, action: PayloadAction<IProducerResponse>) => {
                state.data = action.payload.data;
                state.pagination = action.payload.pagination;
                state.loading = false;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })
});

const {reducer: producerReducer, actions: {reset}} = producerSlice;

const producerActions = {getAll, reset};

export {producerActions, producerReducer};
