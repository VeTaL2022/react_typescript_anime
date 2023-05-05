import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IPerson, IPersonResponse} from "../../../interfaces";
import {personService} from "../../../services";

const personData: IPerson = {
    mal_id: 1,
    url: '',
    website_url: null,
    images: {
        jpg: {
            image_url: ''
        }
    },
    name: 'John Doe',
    given_name: 'John',
    family_name: 'Doe',
    alternate_names: [],
    birthday: '2000-01-01',
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
    data: IPerson,
    loading: boolean,
    error: IError
}

const initialState: IState = {
    data: personData,
    loading: false,
    error: {error: ''}
}

const getFullById = createAsyncThunk<IPersonResponse, { id: string }>(
    'personSlice/getFullById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await personService.getFullById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const personSlice = createSlice({
    name: 'personSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getFullById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFullById.fulfilled, (state, action: PayloadAction<IPersonResponse>) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getFullById.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })
});

const {reducer: personReducer} = personSlice;

const personActions = {getFullById};

export {personActions, personReducer};
