import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ImageInterface} from "../../../interfaces";
import {image_categories} from "../../../configs";
import {imageService} from "../../../services";

interface IError {
    error: string
}

interface IState {
    image: ImageInterface,
    clickedImage: string,
    randomCategory: string,
    error: IError,
    loading: boolean,
}

const initialState: IState = {
    image: {files: []},
    clickedImage: '',
    randomCategory: image_categories[Math.floor(Math.random() * image_categories.length)],
    error: {error: ''},
    loading: false,
}

const getByCategory = createAsyncThunk<ImageInterface, { category: string }>(
    'imageSlice/getByCategory',
    async ({category}, {rejectWithValue}) => {
        try {
            const {data} = await imageService.getByCategory(category);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getAllByCategory = createAsyncThunk<ImageInterface, { category: string }>(
    'imageSlice/getAllByCategory',
    async ({category}, {rejectWithValue}) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const {data} = await imageService.getAllByCategory(category);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const imageSlice = createSlice({
    name: 'imageSlice',
    initialState,
    reducers: {
        setClickedImage: (state, action: PayloadAction<string>) => {
            state.clickedImage = action.payload;
        },
        setRandomCategory: (state, action: PayloadAction<string>) => {
            state.randomCategory = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getByCategory.fulfilled, (state, action) => {
                state.image = action.payload;
                state.loading = false;
            })
            .addCase(getByCategory.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false
            })

            .addCase(getAllByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllByCategory.fulfilled, (state, action) => {
                state.image = action.payload;
                state.loading = false;
            })
            .addCase(getAllByCategory.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false
            })
});

const {reducer: imageReducer, actions: {setClickedImage, setRandomCategory}} = imageSlice;

const imageActions = {getByCategory, getAllByCategory, setClickedImage, setRandomCategory};

export {imageActions, imageReducer};
