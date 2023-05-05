import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {quoteService} from "../../../services";
import {IQuote} from "../../../interfaces";

interface IError {
    error: string
}

interface IState {
    quotes: IQuote[],
    toggle: string,
    value: string,
    currentPage: number,

    formTyping: string,
    formInput: boolean,


    error: IError,
    loading: boolean,
    quote: IQuote
}

const initialState: IState = {
    quotes: [],
    toggle: 'Default',
    value: '',
    currentPage: 0,

    formTyping: '',
    formInput: false,

    error: {error: ''},
    loading: false,
    quote: {anime: '', character: '', quote: ''}
}

const getRandom = createAsyncThunk<IQuote>(
    'quoteSlice/getRandom',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await quoteService.getRandom();
            return data;
        } catch (e) {
            const err = e as AxiosError<IError>;
            if (err.response && err.response.status === 429) {
                return rejectWithValue({
                    error: 'Too many requests. Please try again later.',
                });
            } else {
                return rejectWithValue({
                    error: 'An error occurred (probably too many requests)',
                });
            }
        }
    }
);

const getAllRandom = createAsyncThunk<IQuote[]>(
    'quoteSlice/getTenRandom',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await quoteService.getAllRandom();
            return data;
        } catch (e) {
            const err = e as AxiosError<IError>;
            if (err.response && err.response.status === 429) {
                return rejectWithValue({
                    error: 'Too many requests. Please try again later.',
                });
            } else {
                return rejectWithValue({
                    error: 'An error occurred (probably too many requests)',
                });
            }
        }
    }
);


const getAllByTitle = createAsyncThunk<IQuote[], { title: string, page: number }>(
    'quoteSlice/getTenByTitle',
    async ({title, page}, {rejectWithValue}) => {
        try {
            const {data} = await quoteService.getAllByTitle(title, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getAllByCharacter = createAsyncThunk<IQuote[], { name: string, page: number }>(
    'quoteSlice/getTenByCharacter',
    async ({name, page}, {rejectWithValue}) => {
        try {
            const {data} = await quoteService.getAllByCharacter(name, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const quoteSlice = createSlice({
    name: 'quoteSlice',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<IError>) => {
            state.error = action.payload;
        },
        reset: () => initialState,
        setToggle: (state, action: PayloadAction<string>) => {
            state.toggle = action.payload;
        },
        setValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },

        setFormTyping: (state, action: PayloadAction<string>) => {
            state.formTyping = action.payload;
        },
        setFormInput: (state, action: PayloadAction<boolean>) => {
            state.formInput = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getRandom.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRandom.fulfilled, (state, action) => {
                state.quote = action.payload;
                state.loading = false;
            })
            .addCase(getRandom.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })

            .addCase(getAllRandom.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllRandom.fulfilled, (state, action: PayloadAction<IQuote[]>) => {
                state.quotes = action.payload;
                state.loading = false;
            })
            .addCase(getAllRandom.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })

            .addCase(getAllByTitle.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllByTitle.fulfilled, (state, action: PayloadAction<IQuote[]>) => {
                state.quotes = action.payload;
                state.loading = false;
            })
            .addCase(getAllByTitle.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })

            .addCase(getAllByCharacter.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllByCharacter.fulfilled, (state, action: PayloadAction<IQuote[]>) => {
                state.quotes = action.payload;
                state.loading = false;
            })
            .addCase(getAllByCharacter.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })
});

const {
    reducer: quoteReducer,
    actions: {setError, reset, setToggle, setValue, setCurrentPage, setFormTyping, setFormInput}
} = quoteSlice;

const quoteActions = {
    getRandom,
    getAllRandom,
    getAllByTitle,
    getAllByCharacter,
    setError,
    reset,
    setToggle,
    setValue,
    setCurrentPage,
    setFormTyping,
    setFormInput
};

export {quoteActions, quoteReducer};
