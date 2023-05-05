import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAnimePagination, IAnimeResponse, IAnimeData, IAnime} from "../../../interfaces";
import {animeService} from "../../../services";


const animeData: IAnimeData = {
    mal_id: 0,
    url: '',
    images: {
        jpg: {
            image_url: '',
            small_image_url: '',
            large_image_url: ''
        },
        webp: {
            image_url: '',
            small_image_url: '',
            large_image_url: ''
        }
    },
    trailer: {
        youtube_id: '',
        url: '',
        embed_url: '',
        images: {
            image_url: '',
            small_image_url: '',
            medium_image_url: '',
            large_image_url: '',
            maximum_image_url: ''
        }
    },
    approved: false,
    titles: [],
    title: '',
    title_english: '',
    title_japanese: '',
    title_synonyms: [],
    type: '',
    source: '',
    episodes: 0,
    status: '',
    airing: false,
    aired: {
        from: new Date().getTime(),
        to: new Date().getTime(),
        prop: {
            from: {day: 0, month: 0, year: 0},
            to: {day: 0, month: 0, year: 0}
        },
        string: ''
    },
    duration: '',
    rating: '',
    score: 0,
    scored_by: 0,
    rank: 0,
    popularity: 0,
    members: 0,
    favorites: 0,
    synopsis: '',
    season: '',
    year: 0,
    broadcast: {
        day: '',
        time: '',
        timezone: '',
        string: ''
    },
    producers: [],
    licensors: [],
    studios: [],
    genres: [],
    explicit_genres: [],
    themes: [],
    demographics: [],
    relations: [],
    theme: {openings: [], endings: []},
    external: [],
    streaming: []
}

interface IError {
    error: string
}

interface IState {
    data: IAnimeData[],
    singleData: IAnime,

    currentPage: number,
    sorted: string,
    open: boolean,
    trailerURL: string,

    pagination: IAnimePagination,
    loading: boolean,
    error: IError
}

const initialState: IState = {
    pagination: {
        last_visible_page: 0,
        has_next_page: true,
        current_page: 0,
        items: {per_page: 0, count: 0, total: 0},
    },
    data: [],
    singleData: {data: animeData},
    currentPage: 1,
    sorted: 'score',
    open: false,
    trailerURL: '',
    loading: false,
    error: {error: ''},
};

const getAll = createAsyncThunk<IAnimeResponse, { order_by: string, sort: string, genres: string, producers: string, page: number, limit: number, sfw: boolean }>(
    'animeSlice/getAll',
    async ({order_by, sort, genres, producers, page, limit, sfw}, {rejectWithValue}) => {
        try {
            const {data} = await animeService.getAll(order_by, sort, genres, producers, page, limit, sfw);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getTop = createAsyncThunk<IAnimeResponse, { type: string, filter: string, page: number, limit: number }>(
    'animeSlice/getTop',
    async ({type, filter, page, limit}, {rejectWithValue}) => {
        try {
            const {data} = await animeService.getTop(type, filter, page, limit);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getAllByName = createAsyncThunk<IAnimeResponse, { q: string, page: number, limit: number, sfw: boolean }>(
    'animeSlice/getAllByName',
    async ({q, page, limit, sfw}, {rejectWithValue}) => {
        try {
            const {data} = await animeService.getAllByName(q, page, limit, sfw);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getAllBySeason = createAsyncThunk<IAnimeResponse, { year: number, season: string, page: number }>(
    'animeSlice/getAllBySeason',
    async ({year, season, page}, {rejectWithValue}) => {
        try {
            const {data} = await animeService.getAllBySeason(year, season, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getFullById = createAsyncThunk<IAnime, { id: string }>(
    'animeSlice/getFullById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await animeService.getFullById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const animeSlice = createSlice({
    name: 'animeSlice',
    initialState,
    reducers: {
        resetData: () => initialState,
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSorted: (state, action: PayloadAction<string>) => {
            state.sorted = action.payload;
        },
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setTrailerURL: (state, action: PayloadAction<string>) => {
            state.trailerURL = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAll.fulfilled, (state, action: PayloadAction<IAnimeResponse>) => {
                state.data = action.payload.data;
                state.pagination = action.payload.pagination;
                state.loading = false;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })

            .addCase(getTop.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTop.fulfilled, (state, action: PayloadAction<IAnimeResponse>) => {
                state.data = action.payload.data;
                state.pagination = action.payload.pagination;
                state.loading = false;
            })
            .addCase(getTop.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })

            .addCase(getAllByName.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllByName.fulfilled, (state, action: PayloadAction<IAnimeResponse>) => {
                state.data = action.payload.data;
                state.pagination = action.payload.pagination;
                state.loading = false;
            })
            .addCase(getAllByName.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })

            .addCase(getAllBySeason.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllBySeason.fulfilled, (state, action: PayloadAction<IAnimeResponse>) => {
                state.data = action.payload.data;
                state.pagination = action.payload.pagination;
                state.loading = false;
            })
            .addCase(getAllBySeason.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })

            .addCase(getFullById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFullById.fulfilled, (state, action: PayloadAction<IAnime>) => {
                state.singleData = action.payload;
                state.loading = false;
            })
            .addCase(getFullById.rejected, (state, action) => {
                state.error = action.payload as IError;
                state.loading = false;
            })
});

const {reducer: animeReducer, actions: {resetData, setCurrentPage, setSorted, setOpen, setTrailerURL}} = animeSlice;

const animeActions = {
    getAll,
    getTop,
    getAllByName,
    getAllBySeason,
    getFullById,
    resetData,
    setCurrentPage,
    setSorted,
    setOpen,
    setTrailerURL
};

export {animeActions, animeReducer};
