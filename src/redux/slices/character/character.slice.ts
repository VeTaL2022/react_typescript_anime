import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICharacter, ICharacterResponse} from "../../../interfaces";
import {characterService} from "../../../services";

const characterData: ICharacter = {
    mal_id: 0,
    url: '',
    images: {
        jpg: {image_url: ''},
        webp: {image_url: '', small_image_url: ''}
    },
    name: '',
    name_kanji: '',
    nicknames: [],
    favorites: 0,
    about: '',
    anime: [],
    manga: [],
    voices: []
}

interface IError {
    error: string
}

interface IState {
    data: ICharacter,
    loading: boolean,
    error: IError
}

const initialState: IState = {
    data: characterData,
    loading: false,
    error: {error: ''}
}

const getFullById = createAsyncThunk<ICharacterResponse, { id: string }>(
    'characterSlice/getFullById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await characterService.getFullById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const characterSlice = createSlice({
    name: 'characterSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getFullById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFullById.fulfilled, (state, action: PayloadAction<ICharacterResponse>) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getFullById.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })
});

const {reducer: characterReducer} = characterSlice;

const characterActions = {getFullById};

export {characterActions, characterReducer};

